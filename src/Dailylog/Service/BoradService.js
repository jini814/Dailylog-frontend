import { API_URL } from "../Constant/backendAPI";
import { request } from "./APIService";

export function boardList(pageForm) {
  return request({
    url:
      API_URL +
      "/boards/list" +
      `?page=${pageForm.page}&size=${pageForm.size}&sort=${pageForm.sort}`,
    method: "GET",
  });
} //게시글 목록 불러오기 요청 -> 전체조회

export function boardShow(boardId) {
  return request({
    url: API_URL + "/boards/check/" + boardId,
    method: "GET",
  });
} //게시글 단일 불러오기 요청

export function boardWrite(boardForm) {
  return request({
    url: API_URL + "/boards/post",
    method: "POST",
    body: JSON.stringify(boardForm),
  });
} //게시글 작성 요청

export function boardEdit(boardForm, boardId) {
  return request({
    url: API_URL + "/boards/edit" + boardId,
    method: "PUT",
    body: JSON.stringify(boardForm),
  });
} //게시글 수정 요청

export function boardDelete(boardId) {
  return request({
    url: API_URL + "/boards/delete" + boardId,
    method: "DELETE",
  });
} //게시글 삭제 요청

class AuthService {}
export default new AuthService();
