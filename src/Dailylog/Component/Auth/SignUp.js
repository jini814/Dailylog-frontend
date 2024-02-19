import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {
  requestEmailCode,
  requestEmailVerify,
  signUp,
} from "../../Service/AuthService";

import styles from "./Auth.module.css";
import { IoMdFemale, IoMdMale } from "react-icons/io";

function SignUp() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    name: "",
    sex: "",
    birth: "",
    nickname: "",
  });
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [birth, setBirth] = useState("");

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
      setSignUpForm({
        ...signUpForm,
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

      setSignUpForm({
        ...signUpForm,
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
    if (signUpForm.password === passwordConfirmInput) {
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

  //생년월일 입력하기
  const handleBirthChange = (e) => {
    const birthInput = e.target.value;
    if (birthInput.includes(" ") || birthInput.length > 8) {
      e.preventDefault();
      return;
    }
    const formattedBirth = birthInput.replace(
      /(\d{4})(\d{2})(\d{2})/,
      "$1-$2-$3"
    );
    setBirth(formattedBirth); // 생년월일 입력값 업데이트
    setSignUpForm({
      ...signUpForm,
      birth: formattedBirth, // signUpForm의 birth도 업데이트
    });
  };

  const handleFormChange = (e) => {
    const changeField = e.target.name;
    if (changeField.includes(" ")) {
      e.preventDefault();
      return;
    }
    setSignUpForm({
      ...signUpForm,
      [changeField]: e.target.value,
    });
  };

  // 인증번호 전송 클릭 시
  const onEmailCodeClick = () => {
    if (isCorrectEmail) {
      requestEmailCode(signUpForm.email)
        .then((response) => {
          alert(response.message);
          setIsCodeSent(true);
        })
        .catch((e) => {
          console.log(e);
          alert(`인증번호 전송에 실패하였습니다. ${e.message}`);
        });
    } else {
      alert("올바른 이메일 형식을 입력해주세요.");
      setIsCodeSent(true); //ㅌㅔ스트용 삭제 요망 !!!!!!!!!!!!!!!
    }
  };

  //인증번호 확인 요청 클릭 시
  const onEmailCodeVerifyClick = (e) => {
    if (isCodeSent) {
      requestEmailVerify(emailCode)
        .then((response) => {
          console.log(response);
          alert(response.message);
          setIsEmailVerified(true);
        })
        .catch((e) => {
          console.log(e);
          alert(`이메일 인증에 실패했습니다. ${e.errorMessage}`);
          setIsEmailVerified(true);
        });
    } else {
      alert("이메일 인증번호 전송 버튼을 눌러주세요.");
    }
  };

  //회원가입 요청하기
  const handleFormSubmit = (e) => {
    console.log(signUpForm);
    e.preventDefault();
    if (isPasswordConfirm && isEmailVerified) {
      signUp(signUpForm)
        .then((response) => {
          if (!response) {
            console.log(e);
            alert(`회원가입에 실패하였습니다. ${response}`);
          } else {
            alert("회원가입이 완료되었습니다. 환영합니다!");
            navigate(-1);
          }
        })
        .catch((e) => {
          console.log(e);
          alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
          window.location.reload();
        });
    } else {
      alert("이메일 인증이 필요합니다.");
    }
  };

  return (
    <div className={styles.page}>
      {isMobile ? (
        <div className={styles.mobilePage}>
          <p className={styles.signUp}>회원가입</p>
          <form className={styles.mobileSignUpForm} onSubmit={handleFormSubmit}>
            <p className={styles.formHeader}>이메일</p>
            <input
              className={styles.mobileFormContent}
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
                      className={styles.mobileFormContent}
                      type='text'
                      id='verificationCode'
                      name='verificationCode'
                      placeholder='인증번호 입력'
                      required
                      value={signUpForm.verificationCode}
                      onChange={handleEmailCodeChange}
                    />
                    <p className={styles.formEmailContent}>
                      <p className={styles.formNotice}>
                        남은 시간: {remainingTime}초
                      </p>
                      <p
                        className={styles.formNoticeClick}
                        onClick={onEmailCodeClick}
                      >
                        재전송
                      </p>
                    </p>
                  </>
                )}
                <button
                  className={styles.longBtn}
                  type='button'
                  onClick={
                    isCodeSent ? onEmailCodeVerifyClick : onEmailCodeClick
                  }
                >
                  {isCodeSent ? "인증번호 확인" : "인증번호 전송"}
                </button>
              </>
            )}
            <p className={styles.formHeader}>비밀번호</p>
            <input
              className={styles.mobileFormContent}
              type='password'
              id='password'
              name='password'
              placeholder='비밀번호 입력'
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <input
              className={styles.mobileFormContent}
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
            <p className={styles.formHeader}>사용자 이름</p>
            <input
              className={styles.mobileFormContent}
              type='text'
              id='name'
              name='name'
              placeholder='홍길동'
              required
              value={signUpForm.name}
              onChange={handleFormChange}
            />
            <p className={styles.formHeader}>생년월일</p>
            <input
              className={styles.mobileFormContent}
              type='text'
              id='birth'
              name='birth'
              placeholder='20010101'
              required
              value={birth}
              onChange={handleBirthChange}
              inputMode='numeric'
            />
            <p className={styles.formSexContent}>
              <p className={styles.formSexHeader}>성별</p>
              <input
                className={styles.mobileFormContent}
                type='radio'
                id='male'
                name='sex'
                value='male'
                checked={signUpForm.sex === "male"}
                onChange={handleFormChange}
                required
              />
              <label htmlFor='male' className={styles.radioLabel}>
                남성 <IoMdMale className={styles.maleIcon} />
              </label>
              <input
                className={styles.mobileFormContent}
                type='radio'
                id='female'
                name='sex'
                value='female'
                checked={signUpForm.sex === "female"}
                onChange={handleFormChange}
                required
              />
              <label htmlFor='female' className={styles.radioLabel}>
                여성 <IoMdFemale className={styles.femaleIcon} />
              </label>
            </p>
            <p className={styles.formHeader}>닉네임</p>
            <input
              className={styles.mobileFormContent}
              type='text'
              id='nickname'
              name='nickname'
              placeholder='닉네임 입력'
              required
              value={signUpForm.nickname}
              onChange={handleFormChange}
            />
            <button className={styles.longBtn} type='submit'>
              가입하기
            </button>
          </form>
        </div>
      ) : (
        <div className={styles.pcPage}>
          <p className={styles.signUp}>회원가입</p>
          <form className={styles.signUpForm} onSubmit={handleFormSubmit}>
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
                      value={signUpForm.verificationCode}
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
                  className={styles.longBtn}
                  type='button'
                  onClick={
                    isCodeSent ? onEmailCodeVerifyClick : onEmailCodeClick
                  }
                >
                  {isCodeSent ? "인증번호 확인" : "인증번호 전송"}
                </button>
              </>
            )}
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
            <p className={styles.formHeader}>사용자 이름</p>
            <input
              className={styles.formContent}
              type='text'
              id='name'
              name='name'
              placeholder='홍길동'
              required
              value={signUpForm.name}
              onChange={handleFormChange}
            />
            <p className={styles.formHeader}>생년월일</p>
            <input
              className={styles.formContent}
              type='text'
              id='birth'
              name='birth'
              placeholder='20010101'
              required
              value={birth}
              onChange={handleBirthChange}
              inputMode='numeric'
            />
            <p className={styles.formSexContent}>
              <p className={styles.formSexHeader}>성별</p>
              <input
                className={styles.formContent}
                type='radio'
                id='male'
                name='sex'
                value='male'
                checked={signUpForm.sex === "male"}
                onChange={handleFormChange}
                required
              />
              <label htmlFor='male' className={styles.radioLabel}>
                남성 <IoMdMale className={styles.maleIcon} />
              </label>
              <input
                className={styles.formContent}
                type='radio'
                id='female'
                name='sex'
                value='female'
                checked={signUpForm.sex === "female"}
                onChange={handleFormChange}
                required
              />
              <label htmlFor='female' className={styles.radioLabel}>
                여성 <IoMdFemale className={styles.femaleIcon} />
              </label>
            </p>
            <p className={styles.formHeader}>닉네임</p>
            <input
              className={styles.formContent}
              type='text'
              id='nickname'
              name='nickname'
              placeholder='닉네임 입력'
              required
              value={signUpForm.nickname}
              onChange={handleFormChange}
            />
            <button className={styles.longBtn} type='submit'>
              가입하기
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SignUp;
