import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { boardShow } from "../../Service/BoradService";
import { checkIfLoggedIn } from "../../Service/AuthService";

import styles from "./Board.module.css";

function BoardCreate() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const { id } = useParams;
  const [boardForm, setBoardForm] = useState({
    email: "",
    title: "",
    content: "",
    board_type: "text_board",
  });
  /*
  useEffect(() => {
    if (!checkIfLoggedIn()) {
      navigate("/login");
      return;
    } else {
      navigate("/");
    }
  }, []);*/

  return (
    <div className={styles.page}>
      {isMobile ? (
        <div className={styles.mobilePage}>dd</div>
      ) : (
        <div className={styles.pcBoardPage}>
          <div className={styles.leftSidePage}></div>
          <div className={styles.boardPage}>ㅇㅇ</div>
        </div>
      )}
    </div>
  );
}
export default BoardCreate;
