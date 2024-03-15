import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Moment from "moment"; //날짜 및 시간 표시 라이브러리
import { checkIfLoggedIn } from "../../Service/AuthService";
import { boardList } from "../../Service/BoradService";

import styles from "./BoardPage.module.css";
import no_image from "../../Image/no_image.png";
import user_image from "../../Image/user.png";
import { SlOptionsVertical } from "react-icons/sl";
import { RxPencil1 } from "react-icons/rx";

import TestBoard from "../TestBoard";

function BoardList() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [pageForm, setPageForm] = useState({
    page: 0,
    size: 10,
    sort: "id,DESC",
  });
  const [boardsList, setBoardsList] = useState([]);
  const [activeButton, setActiveButton] = useState("recommend");

  /*
  useEffect(() => {
    if (!checkIfLoggedIn()) {
      navigate("/login");
      return;
    } else {
      navigate("/");
    }
  }, []); */

  useEffect(() => {
    setBoardsList(TestBoard);
    //fetchBoardList();
  }, []);

  const fetchBoardList = () => {
    boardList(pageForm)
      .then((response) => {
        setBoardsList(response.content);
      })
      .catch((e) => {
        console.log(e);
        window.alert("불러오기에 실패했습니다. 다시 시도해주세요.");
      });
  };

  const onClickRecommend = () => {
    setActiveButton("recommend");
    setBoardsList(TestBoard);
    // fetchBoardList();
  };

  const onClickFollow = () => {
    setActiveButton("follow");
    setBoardsList(TestBoard);
    // fetchBoardList();
  };

  const onClickCreate = () => {
    /*   if (!checkIfLoggedIn()) {
      navigate("/login");
    } else { */
    navigate("/board/create");
    //}
  };

  const onClickBoard = (boardId) => {
    /*   if (!checkIfLoggedIn()) {
      navigate("/login");
    } else { */
    navigate(`/board/${boardId}`);
    //}
  };

  const onClickUserProfile = (e) => {
    e.stopPropagation();
    navigate("/userProfile"); //상대방 페이지로 이동, 주소 수정 해야함
  };

  const onClickOption = (e) => {
    e.stopPropagation();
    console.log("누름");
  };

  return (
    <>
      {isMobile ? (
        <div className={styles.mobileMainPage}>모바일 BoardList</div>
      ) : (
        <div className={styles.pcBoardList}>
          <RxPencil1
            className={styles.boardCreateBtn}
            onClick={onClickCreate}
          />
          <div className={styles.boardOptBox}>
            <button
              className={
                activeButton === "recommend"
                  ? `${styles.boardOpt} ${styles.boardOptActive}`
                  : styles.boardOpt
              }
              onClick={onClickRecommend}
            >
              추천
            </button>
            <button
              className={
                activeButton === "follow"
                  ? `${styles.boardOpt} ${styles.boardOptActive}`
                  : styles.boardOpt
              }
              onClick={onClickFollow}
            >
              팔로우
            </button>
          </div>
          <div className={styles.boardList}>
            {activeButton === "recommend" && (
              <>
                {boardsList.map((board, index) => (
                  <div
                    key={index}
                    className={styles.boardItem}
                    onClick={() => onClickBoard(board.boardId)}
                  >
                    {board.boardType === "text_board" ? (
                      <div className={styles.listNoImgBox}>
                        <img
                          className={styles.listNoImg}
                          src={no_image}
                          alt='no Image'
                        ></img>
                      </div>
                    ) : (
                      <img
                        className={styles.listImg}
                        src={board.storedImgUrl}
                        alt='Image'
                      />
                    )}
                    <div className={styles.listBox}>
                      {!board.storedImgUrl ? (
                        <img
                          className={styles.listUserImg}
                          src={user_image}
                          alt='user_image'
                          onClick={onClickUserProfile}
                        />
                      ) : (
                        <img
                          className={styles.listUserImg}
                          src={board.storedImageUrl}
                          alt='Image'
                          onClick={onClickUserProfile}
                        />
                      )}
                      <div className={styles.listContentBox}>
                        <h3 className={styles.listTitle}>{board.title}</h3>
                        <p className={styles.listNickname}>{board.nickname}</p>
                        <p className={styles.listContent}>
                          {Moment(board.createdDate).format("YYYY.MM.DD")}
                        </p>
                        <p className={styles.listContent}>
                          좋아요 {board.likedCount} 댓글 {board.commentCount}
                        </p>
                      </div>

                      <SlOptionsVertical
                        className={styles.listOptIcon}
                        onClick={onClickOption}
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
            {activeButton === "follow" && (
              <>
                {boardsList.map((board, index) => (
                  <div
                    key={index}
                    className={styles.boardItem}
                    onClick={() => onClickBoard(board.boardId)}
                  >
                    {board.boardType === "text_board" ? (
                      <div className={styles.listNoImgBox}>
                        <img
                          className={styles.listNoImg}
                          src={no_image}
                          alt='no Image'
                        ></img>
                      </div>
                    ) : (
                      <img
                        className={styles.listImg}
                        src={board.storedImgUrl}
                        alt='Image'
                      />
                    )}
                    <div className={styles.listBox}>
                      {!board.storedImgUrl ? (
                        <img
                          className={styles.listUserImg}
                          src={user_image}
                          alt='user_image'
                          onClick={onClickUserProfile}
                        />
                      ) : (
                        <img
                          className={styles.listUserImg}
                          src={board.storedImgUrl}
                          alt='Image'
                          onClick={onClickUserProfile}
                        />
                      )}
                      <div className={styles.listContentBox}>
                        <h3 className={styles.listTitle}>{board.title}</h3>
                        <p className={styles.listNickname}>{board.nickname}</p>
                        <p className={styles.listContent}>
                          {Moment(board.createdDate).format("YYYY.MM.DD")}
                        </p>
                        <p className={styles.listContent}>
                          좋아요 {board.likedCount} 댓글 {board.commentCount}
                        </p>
                      </div>

                      <SlOptionsVertical
                        className={styles.listOptIcon}
                        onClick={onClickOption}
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default BoardList;
