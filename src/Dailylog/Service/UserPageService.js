import { API_URL } from "../Constant/backendAPI";
import { request } from "./APIService";

export function getUserProfile(userId) {
  return request({
    url: API_URL + "/user/profile/" + userId,
    method: "GET",
  });
} //마이페이지 기본 정보 불러오기 요청 (UserDTO)

class AuthService {}
export default new AuthService();
