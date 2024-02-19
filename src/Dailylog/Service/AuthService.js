import { API_URL } from "../Constant/backendAPI";
import { request } from "./APIService";

export function logIn(loginRequest) {
  return request({
    url: API_URL + "/login",
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
} //로그인 요청

export function requestEmailCode(email) {
  return request({
    url: API_URL + "/auth-email/",
    method: "POST",
    body: JSON.stringify(email),
  });
} //이메일 인증 요청

export function passwordRequestEmailCode(passwordRequest) {
  return request({
    url: API_URL + "/auth-email/",
    method: "POST",
    body: JSON.stringify(passwordRequest),
  });
} //비밀번호 재설정하기 - 이메일 인증 요청

export function requestEmailVerify(code) {
  return request({
    url: API_URL + "/auth-email-confirm/",
    method: "GET",
    body: JSON.stringify(code),
  });
} //이메일 인증 확인 요청

export function signUp(signUpRequest) {
  return request({
    url: API_URL + "/join",
    method: "POST",
    body: JSON.stringify(signUpRequest),
  });
} //회원가입 요청

export function resetPassword(passwordRequest) {
  return request({
    url: API_URL + "/password-reset",
    method: "POST",
    body: JSON.stringify(passwordRequest),
  });
} //비밀번호 재설정하기 요청

class AuthService {}
export default new AuthService();
