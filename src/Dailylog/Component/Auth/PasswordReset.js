import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {
  passwordRequestEmailCode,
  requestEmailVerify,
  resetPassword,
} from "../../Service/AuthService";

import styles from "./Auth.module.css";

function PasswordReset() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [isSignedForm, setIsSignedForm] = useState({
    email: "",
    name: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    email: isSignedForm.email,
    name: isSignedForm.name,
    password: "",
  });
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  //확인 메세지
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  //유효성 검사
  const [isCorrectEmail, setIsCorrectEmail] = useState(""); //올바른 이메일 형식인지 확인하기
  const [isCodeSent, setIsCodeSent] = useState(false); // 이메일 인증코드 전송 여부 확인하기
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 완료
  const [isCorrectPassword, setIsCorrectPassword] = useState(""); //올바른 비밀번호 형식인지 확인하기
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(""); //비밀번호 확인하기

  //상태값 저장
  const [remainingTime, setRemainingTime] = useState(180);

  // 이메일 인증코드 전송 후 3분동안 남은 시간 표시하는 기능
  useEffect(() => {
    let interval;
    if (isCodeSent && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isCodeSent, remainingTime]);

  //이메일 입력 시 이메일 유효 확인
  const handleEmailChange = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailInput = e.target.value;
    setEmail(e.target.value);
    if (!emailRegex.test(emailInput)) {
      setIsCorrectEmail(false);
    } else {
      setIsCorrectEmail(true);
      setIsSignedForm({
        ...isSignedForm,
        email: e.target.value,
      });
      setPasswordForm({
        ...passwordForm,
        email: e.target.value,
      });
    }
  };

  //비밀번호 입력 시 소문자, 숫자, 특수문자, 8~16자
  const handlePasswordChange = (e) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,16})/;
    const passwordInput = e.target.value;
    if (passwordInput.includes(" ")) {
      e.preventDefault();
      return;
    }
    setPassword(e.target.value);
    if (!passwordRegex.test(passwordInput)) {
      setPasswordMessage(
        "비밀번호는 문자, 숫자, 특수문자를 포함한 8~16자로 설정해주세요."
      );
      setIsCorrectPassword(false);
    } else {
      setPasswordMessage("");
      setIsCorrectPassword(true);

      setPasswordForm({
        ...passwordForm,
        password: passwordInput,
      });
    }
  };

  //비밀번호 입력 시 일치 확인
  const handlePasswordConfirmChange = (e) => {
    const passwordConfirmInput = e.target.value;
    if (passwordConfirmInput.includes(" ")) {
      e.preventDefault();
      return;
    }
    setPasswordConfirm(e.target.value);
    if (passwordForm.password === passwordConfirmInput) {
      setPasswordConfirmMessage("");
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage("비밀번호와 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    }
  };
  //인증번호 입력하기
  const handleEmailCodeChange = (e) => {
    setEmailCode(e.target.value);
  };

  const handleFormChange = (e) => {
    const changeField = e.target.name;
    if (changeField.includes(" ")) {
      e.preventDefault();
      return;
    }
    setIsSignedForm({
      ...isSignedForm,
      [changeField]: e.target.value,
    });
    setPasswordForm({
      ...passwordForm,
      [changeField]: e.target.value,
    });
  };

  // 인증번호 전송 클릭 시
  const onEmailCodeClick = () => {
    if (isCorrectEmail && isSignedForm.name) {
      passwordRequestEmailCode(isSignedForm)
        .then((response) => {
          alert("인증코드가 전송되었습니다. 이메일을 확인해주세요.");
          setIsCodeSent(true);
        })
        .catch((e) => {
          console.log(e);
          alert(`인증번호 전송에 실패하였습니다. ${e.message}`);
        });
    } else {
      alert("올바른 이메일 형식 및 이름을 입력해주세요.");
      setIsCodeSent(true); //ㅌㅔ스트용 삭제 요망 !!!!!!!!!!!!!!!
    }
  };

  //인증번호 확인 요청 클릭 시
  const onEmailCodeVerifyClick = (e) => {
    if (isCodeSent) {
      requestEmailVerify(emailCode)
        .then((response) => {
          console.log(response);
          alert("이메일 인증이 완료되었습니다.");
          setIsEmailVerified(true);
        })
        .catch((e) => {
          console.log(e);
          alert(`이메일 인증에 실패했습니다. ${e.errorMessage}`);
        });
    } else {
      alert("이메일 인증번호 전송 버튼을 눌러주세요.");
    }
  };

  //비밀번호 재설정하기
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isCorrectPassword && isPasswordConfirm && isEmailVerified) {
      resetPassword(passwordForm)
        .then((response) => {
          console.log(response);
          alert("비밀번호 재설정이 완료되었습니다. 다시 로그인해주세요");
          navigate(-1);
        })
        .catch((e) => {
          console.log(e);
          alert("비밀번호 재설정에 실패하였습니다. 다시 시도해주세요.");
        });
    } else {
      alert("이메일 인증이 필요합니다.");
    }
  };

  return (
    <>
      {isMobile ? (
        <div className={styles.mobilePage}>
          <p className={styles.signUpNotice}>비밀번호 찾기</p>
          <form className={styles.mobileSignUpForm} onSubmit={handleFormSubmit}>
            <p className={styles.formHeader}>사용자 이름</p>
            <input
              className={styles.formContent}
              type='text'
              id='name'
              name='name'
              placeholder='홍길동'
              required
              value={isSignedForm.name}
              onChange={handleFormChange}
            />
            <p className={styles.formHeader}>이메일</p>
            <input
              className={styles.formContent}
              type='email'
              id='email'
              name='email'
              placeholder='아이디 입력'
              required
              value={email}
              onChange={handleEmailChange}
              disabled={isCodeSent}
            />
            {!isEmailVerified && (
              <>
                {isCodeSent && (
                  <>
                    <input
                      className={styles.formContent}
                      type='text'
                      id='verificationCode'
                      name='verificationCode'
                      placeholder='인증번호 입력'
                      required
                      value={emailCode}
                      onChange={handleEmailCodeChange}
                    />
                    <p className={styles.formEmailContent}>
                      <p className={styles.formNotice}>
                        남은 시간: {remainingTime}초
                      </p>
                      <p className={styles.formNoticeClick}> 재전송</p>
                    </p>
                  </>
                )}
                <button
                  className={styles.blackBtn}
                  type='button'
                  onClick={
                    isCodeSent ? onEmailCodeVerifyClick : onEmailCodeClick
                  }
                >
                  {isCodeSent ? "인증번호 확인" : "인증번호 전송"}
                </button>
              </>
            )}
            {isEmailVerified && (
              <>
                <p className={styles.formHeader}>비밀번호</p>
                <input
                  className={styles.formContent}
                  type='password'
                  id='password'
                  name='password'
                  placeholder='비밀번호 입력'
                  required
                  value={password}
                  onChange={handlePasswordChange}
                />
                <input
                  className={styles.formContent}
                  type='password'
                  id='password'
                  name='password'
                  placeholder='비밀번호 확인'
                  required
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                />
                {passwordMessage && (
                  <p className={styles.formNotice}>{passwordMessage}</p>
                )}
                {passwordConfirmMessage && (
                  <p className={styles.formNotice}>{passwordConfirmMessage}</p>
                )}
                <button className={styles.blackBtn} type='submit'>
                  비밀번호 재설정하기
                </button>
              </>
            )}
          </form>
        </div>
      ) : (
        <div className={styles.pcPage}>
          <p className={styles.signUpNotice}>비밀번호 찾기</p>
          <form className={styles.pcSignUpForm} onSubmit={handleFormSubmit}>
            <p className={styles.formHeader}>사용자 이름</p>
            <input
              className={styles.formContent}
              type='text'
              id='name'
              name='name'
              placeholder='홍길동'
              required
              value={isSignedForm.name}
              onChange={handleFormChange}
            />
            <p className={styles.formHeader}>이메일</p>
            <input
              className={styles.formContent}
              type='email'
              id='email'
              name='email'
              placeholder='아이디 입력'
              required
              value={email}
              onChange={handleEmailChange}
              disabled={isCodeSent}
            />
            {!isEmailVerified && (
              <>
                {isCodeSent && (
                  <>
                    <input
                      className={styles.formContent}
                      type='text'
                      id='verificationCode'
                      name='verificationCode'
                      placeholder='인증번호 입력'
                      required
                      value={emailCode}
                      onChange={handleEmailCodeChange}
                    />
                    <p className={styles.formEmailContent}>
                      <p className={styles.formNotice}>
                        남은 시간: {remainingTime}초
                      </p>
                      <p className={styles.formNoticeClick}> 재전송</p>
                    </p>
                  </>
                )}
                <button
                  className={styles.blackBtn}
                  type='button'
                  onClick={
                    isCodeSent ? onEmailCodeVerifyClick : onEmailCodeClick
                  }
                >
                  {isCodeSent ? "인증번호 확인" : "인증번호 전송"}
                </button>
              </>
            )}
            {isEmailVerified && (
              <>
                <p className={styles.formHeader}>비밀번호</p>
                <input
                  className={styles.formContent}
                  type='password'
                  id='password'
                  name='password'
                  placeholder='비밀번호 입력'
                  required
                  value={password}
                  onChange={handlePasswordChange}
                />
                <input
                  className={styles.formContent}
                  type='password'
                  id='password'
                  name='password'
                  placeholder='비밀번호 확인'
                  required
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                />
                {passwordMessage && (
                  <p className={styles.formNotice}>{passwordMessage}</p>
                )}
                {passwordConfirmMessage && (
                  <p className={styles.formNotice}>{passwordConfirmMessage}</p>
                )}
                <button className={styles.blackBtn} type='submit'>
                  비밀번호 재설정하기
                </button>
              </>
            )}
          </form>
        </div>
      )}
    </>
  );
}

export default PasswordReset;
