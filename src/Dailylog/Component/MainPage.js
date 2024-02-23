import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { checkIfLoggedIn } from "../Service/AuthService";
import { getUserProfile } from "../Service/UserPageService";

import styles from "./Page.module.css";
import LeftSide from "./LeftSide";
//import BoardList from "./BoardList";
import RightSide from "./RightSide";

import TestUser from "./TestUser";

function MainPage() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const { id } = useParams;
  const [profile, setProfile] = useState({});
  const [activeButton, setActiveButton] = useState("recommendation");

  useEffect(() => {
    if (!checkIfLoggedIn()) {
      navigate("/login");
      return;
    } else {
      navigate("/");
    }
  }, []);

  /* 
  useEffect(() => {
    getUserProfile(id)
      .then((response) => {
        setProfile(response);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
        alert("오류 발생");
      });
  }, []); */

  //테스트용 Dummy data
  useEffect(() => {
    setProfile(TestUser);
    console.log(profile);
  }, [profile]);

  const onClickRecommendation = () => {
    setActiveButton("recommendation");
  };

  const onClickFollow = () => {
    setActiveButton("follow");
  };

  return (
    <div className={styles.page}>
      {isMobile ? (
        <div className={styles.mobileMainPage}></div>
      ) : (
        <div className={styles.pcMainPage}>
          <div className={styles.leftSidePage}>
            <LeftSide profile={profile} />
          </div>
          <div className={styles.mainPage}>
            <div className={styles.mainOptBox}>
              <button
                className={
                  activeButton === "recommendation"
                    ? `${styles.mainOptNotice} ${styles.mainOptActive}`
                    : styles.mainOptNotice
                }
                onClick={onClickRecommendation}
              >
                추천
              </button>
              <button
                className={
                  activeButton === "follow"
                    ? `${styles.mainOptNotice} ${styles.mainOptActive}`
                    : styles.mainOptNotice
                }
                onClick={onClickFollow}
              >
                팔로우
              </button>
            </div>
          </div>
          <div className={styles.rightSidePage}>
            <RightSide />
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
