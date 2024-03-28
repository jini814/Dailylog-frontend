import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {
  ACCESS_TOKEN,
  EMAIL,
  KAKAO_AUTH_URL,
  NAVER_AUTH_URL,
  GOOGLE_AUTH_URL,
} from "../../Constant/backendAPI";
import { logIn } from "../../Service/AuthService";

import styles from "./Auth.module.css";
import logo_image from "../../Image/logo.png"; //로고 이미지
import kakao from "../../Image/kakao.png";
import naver from "../../Image/naver.png";
import google from "../../Image/google.png";

function Login() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    const changeField = e.target.name;
    setLoginForm({
      ...loginForm,
      [changeField]: e.target.value,
    });
  };

  const onClickFormSubmit = (e) => {
    e.preventDefault();
    logIn(loginForm)
      .then((response) => {
        setJwtToken(response);
        console.log(response);
        alert("로그인이 완료되었습니다.");
        navigate("/");
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
        alert("로그인에 실패하였습니다. 다시 시도해주시길 바랍니다.");
      });
  };

  const setJwtToken = (response) => {
    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
  };

  const setEmail = (response) => {
    localStorage.setItem(EMAIL, response.email);
  };

  const onClickPasswordReset = (e) => {
    navigate("/password-reset");
  };

  const onClickCreateAuth = (e) => {
    navigate("/signup");
  };

  return (
    <>
      {isMobile ? (
        <div className={styles.mobileLoginPage}>
          <img
            className={styles.mobileLogoImg}
            src={logo_image}
            alt='Logo'
          ></img>
          <form className={styles.mobileLoginForm} onSubmit={onClickFormSubmit}>
            <input
              className={styles.formContent}
              type='email'
              id='email'
              name='email'
              placeholder='아이디'
              required
              value={loginForm.email}
              onChange={handleFormChange}
            />
            <input
              className={styles.formContent}
              type='password'
              id='password'
              name='password'
              placeholder='비밀번호'
              required
              value={loginForm.password}
              onChange={handleFormChange}
            />
            <button className={styles.blackBtn} type='submit'>
              로그인
            </button>
          </form>
          <p className={styles.passwordMenu} onClick={onClickPasswordReset}>
            비밀번호 찾기
          </p>
          <hr className={styles.mobileHr} />
          <img className={styles.socialKakao} src={kakao} alt='Kakao'></img>
          <img className={styles.socialNaver} src={naver} alt='Naver'></img>
          <img className={styles.socialGoogle} src={google} alt='Google'></img>
          <p className={styles.menuNoticew}>
            <p>계정이 없으신가요?</p>
            <p className={styles.signUpMenu} onClick={onClickCreateAuth}>
              회원가입
            </p>
          </p>
        </div>
      ) : (
        <div className={styles.pcPage}>
          <img className={styles.pcLogoImg} src={logo_image} alt='Logo'></img>
          <form className={styles.pcLoginForm} onSubmit={onClickFormSubmit}>
            <input
              className={styles.formContent}
              type='email'
              id='email'
              name='email'
              placeholder='아이디'
              required
              value={loginForm.email}
              onChange={handleFormChange}
            />
            <input
              className={styles.formContent}
              type='password'
              id='password'
              name='password'
              placeholder='비밀번호'
              required
              value={loginForm.password}
              onChange={handleFormChange}
            />
            <button className={styles.blackBtn} type='submit'>
              로그인
            </button>
          </form>
          <p className={styles.passwordMenu} onClick={onClickPasswordReset}>
            비밀번호 찾기
          </p>
          <hr className={styles.hr} />
          <a href={KAKAO_AUTH_URL}>
            <img className={styles.socialKakao} src={kakao} alt='Kakao' />
          </a>
          <a href={NAVER_AUTH_URL}>
            <img className={styles.socialNaver} src={naver} alt='Naver' />
          </a>
          <a href={GOOGLE_AUTH_URL}>
            <img className={styles.socialGoogle} src={google} alt='Google' />
          </a>
          <p className={styles.menuNoticew}>
            <p>계정이 없으신가요?</p>
            <p className={styles.signUpMenu} onClick={onClickCreateAuth}>
              회원가입
            </p>
          </p>
        </div>
      )}
    </>
  );
}

export default Login;
