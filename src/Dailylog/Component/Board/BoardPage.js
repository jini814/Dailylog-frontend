import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import "moment/locale/ko"; //moment 한글화
import Moment from "moment"; //날짜 및 시간 표시 라이브러리
import { boardShow, boardDelete } from "../../Service/BoradService";
import { checkIfLoggedIn } from "../../Service/AuthService";

import styles from "./BoardPage.module.css";
import user_image from "../../Image/user.png";
import { MdOutlineArrowBack } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import TestBoard2 from "../TestBoard2";

function BoardPage() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const { id } = useParams();
  const [board, setBoard] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setBoard(TestBoard2);
    console.log(board);
    //fetchBoard();
  }, [board]);

  useEffect(() => {
    //게시글 작성자와 로그인 사용자 동일 여부 확인하기
    const storedEmail = localStorage.getItem("email");
    if (board.writerEmail === storedEmail) {
      setIsEditable(true);
    } else {
      setIsEditable(false);
    }
  }, [board]);

  //게시글 불러오기
  const fetchBoard = () => {
    boardShow(id)
      .then((response) => {
        setBoard(response);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
        alert("불러오기에 실패했습니다. 다시 시도해주시길 바랍니다.");
        navigate("/");
      });
  };

  const onClickBack = (e) => {
    navigate(-1);
  };

  const onClickUserProfile = (e) => {
    e.stopPropagation();
    navigate("/userProfile"); //상대방 페이지로 이동, 주소 수정 해야함
  };

  const onClickLiked = () => {
    setLiked(!liked);
  };

  //게시글 수정
  const onClickModify = () => {
    navigate(`/board/modify/${id}`);
  };

  const onClickDelete = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      boardDelete(id)
        .then((response) => {
          alert("삭제가 완료되었습니다.");
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
          alert("게시글 삭제에 실패했습니다. 다시 시도해주시길 바랍니다.");
        });
    }
  };

  return (
    <>
      {isMobile ? (
        <div className={styles.mobilePage}>dd</div>
      ) : (
        <div className={styles.pcBoardPage} key={board.id}>
          <MdOutlineArrowBack
            className={styles.boardBackIcon}
            onClick={onClickBack}
          />
          <h2>{board.title} </h2>
          <div className={styles.boardViews}>
            {!board.storedImageUrl ? (
              <img
                className={styles.boardUserImg}
                src={user_image}
                alt='user_image'
                onClick={onClickUserProfile}
              />
            ) : (
              <img
                className={styles.boardUserImg}
                src={board.storedImageUrl}
                alt='Image'
                onClick={onClickUserProfile}
              />
            )}
            <p className={styles.boardNickname}> {board.nickname}</p>
            <p className={styles.boardCreatedDate}>
              {Moment(board.createdDate).format("YYYY.MM.DD A hh:mm ")}{" "}
            </p>
          </div>
          <hr className={styles.hr} />
          <div className={styles.boardContentBox}>
            <p className={styles.boardContent}>{board.content}</p>
            <div className={styles.boardSettings}>
              <div className={styles.boardLikedBox}>
                {liked ? (
                  <FaHeart
                    className={styles.boardLikedTrueIcon}
                    onClick={onClickLiked}
                  />
                ) : (
                  <FaRegHeart
                    className={styles.boardLikedFalseIcon}
                    onClick={onClickLiked}
                  />
                )}
                <p className={styles.boardLikedCount}>{board.likedCount}</p>
              </div>
              <p className={styles.boardEditBtn} onClick={onClickModify}>
                수정
              </p>
              <p className={styles.boardDeleteBtn} onClick={onClickDelete}>
                삭제
              </p>
            </div>
          </div>
          <hr className={styles.hr} />
        </div>
      )}
    </>
  );
}
export default BoardPage;
