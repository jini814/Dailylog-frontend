import { API_URL } from "../Constant/backendAPI";
import { request } from "./APIService";

export function listArticle(pageForm) {
  return request({
    url:
      API_URL +
      "/boards/list" +
      `?page=${pageForm.page}&size=${pageForm.size}&sort=${pageForm.sort}`,
    method: "GET",
  });
} //게시글 목록 불러오기 요청

export function showArticle(boardId) {
  return request({
    url: API_URL + "/boards/check/" + boardId,
    method: "GET",
  });
} //게시글 단일 불러오기 요청

export function boardWrite(boardForm) {
  return request({
    url: API_URL + "/boards/write",
    method: "POST",
    body: JSON.stringify(boardForm),
  });
} //게시글 작성 요청

export function boardEdit(boardForm) {
  return request({
    url: API_URL + "/boards/edit",
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
