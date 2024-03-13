import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { boardWrite } from "../../Service/BoradService";

import styles from "./Board.module.css";
import { FaRegImage, FaVideo } from "react-icons/fa";

function BoardCreate() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [boardForm, setBoardForm] = useState({
    email: "",
    title: "",
    content: "",
    board_type: "text_board",
  });

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setBoardForm((prevForm) => ({ ...prevForm, email: email }));
    }
  }, []);

  const handleBoardFormChange = (e) => {
    const changedField = e.target.name;
    let newValue = e.target.value;
    setBoardForm({
      ...boardForm,
      [changedField]: newValue,
    });
  };

  const onClickFormSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("게시글을 작성하시겠습니까?")) {
      boardWrite(boardForm)
        .then((response) => {
          alert("게시글 작성이 완료되었습니다.");
          navigate("/");
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
          alert("게시글 작성에 실패했습니다. 다시 시도해주시길 바랍니다.");
        });
    }
  };

  const onClickCancelButton = () => {
    if (window.confirm("게시글 작성을 취소하시겠습니까?")) {
      navigate("/");
    }
  };
  const onClickTemporarySaveButton = () => {
    if (window.confirm("게시글을 임시저장하시겠습니까?")) {
      navigate("/");
    }
  };

  const onClickImage = (e) => {
    e.preventDefault();
    console.log("이미지 선택");
  };
  const onClickVideo = (e) => {
    e.preventDefault();
    console.log("동영상 선택");
  };

  return (
    <>
      {isMobile ? (
        <div className={styles.mobilePage}>dd</div>
      ) : (
        <div className={styles.pcPage}>
          <form className={styles.createForm} onSubmit={onClickFormSubmit}>
            <div className={styles.createFormContent}>
              <input
                className={styles.formTitle}
                type='text'
                id='title'
                name='title'
                placeholder='제목을 입력하세요.'
                required
                value={boardForm.title}
                onChange={handleBoardFormChange}
              />
            </div>
            <div className={styles.formOption}>
              <>
                <FaRegImage className={styles.optionIcon} />
                <button className={styles.optionBtn} onClick={onClickImage}>
                  사진
                </button>
              </>
              <>
                <FaVideo className={styles.optionIcon} />
                <button className={styles.optionBtn} onClick={onClickVideo}>
                  동영상
                </button>
              </>
            </div>
            <div className={styles.createFormContent}>
              <textarea
                className={styles.formContent}
                id='content'
                name='content'
                placeholder='내용을 입력하세요.'
                required
                value={boardForm.content}
                onChange={handleBoardFormChange}
              />
            </div>
            <div className={styles.formButton}>
              <button
                className={styles.cancelBtn}
                type='button'
                onClick={onClickCancelButton}
              >
                취소
              </button>
              <button
                className={styles.prevBtn}
                type='button'
                onClick={onClickTemporarySaveButton}
              >
                임시저장
              </button>
              <button className={styles.submitBtn} type='submit'>
                등록
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
export default BoardCreate;
