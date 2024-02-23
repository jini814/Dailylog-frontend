import { API_URL, ACCESS_TOKEN } from "../Constant/backendAPI";
import { request } from "./APIService";

export function logIn(loginForm) {
  return request({
    url: API_URL + "/login",
    method: "POST",
    body: JSON.stringify(loginForm),
  });
} //로그인 요청

export function requestEmailCode(email) {
  return request({
    url: API_URL + "/auth-email",
    method: "POST",
    body: JSON.stringify({ email: email }),
  });
} //이메일 인증 요청

export function requestEmailVerify(code) {
  return request({
    url: API_URL + "/auth-email-confirm",
    method: "POST",
    body: JSON.stringify({ code: code }),
  });
} //이메일 인증 확인 요청

export function signUp(signUpForm) {
  return request({
    url: API_URL + "/join",
    method: "POST",
    body: JSON.stringify(signUpForm),
  });
} //회원가입 요청

export function passwordRequestEmailCode(isSignedForm) {
  return request({
    url: API_URL + "/check-user",
    method: "POST",
    body: JSON.stringify(isSignedForm),
  });
} //비밀번호 재설정하기 - 이메일 인증 요청

export function resetPassword(passwordForm) {
  return request({
    url: API_URL + "/modify-pw",
    method: "POST",
    body: JSON.stringify(passwordForm),
  });
} //비밀번호 재설정하기 요청

export function checkIfLoggedIn() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    window.alert("로그인이 필요한 서비스입니다.");
    return false;
  }
  return true;
} //로그인 여부 확인 - 토큰

class AuthService {}
export default new AuthService();
