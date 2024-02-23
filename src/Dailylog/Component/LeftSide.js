import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import styles from "./Page.module.css";
import logo_image from "../Image/logo.png";
import user_image from "../Image/user.png";
import { AiOutlineHome } from "react-icons/ai";
import { FiUser } from "react-icons/fi";

function LeftSide({ profile }) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [myProfile, setMyProfile] = useState({});
  const [activeButton, setActiveButton] = useState("home");

  useEffect(() => {
    setMyProfile(profile);
    console.log(profile);
  }, [profile]);

  const onClickHome = (e) => {
    setActiveButton("home");
    navigate("/");
    window.location.reload();
  };

  const onClickMyPage = (e) => {
    setActiveButton("mypage");
    navigate("/mypage");
  };

  return (
    <>
      {isMobile ? (
        <div className={styles.mobilePage}>dd</div>
      ) : (
        <div className={styles.pcLeftPage}>
          <img className={styles.logoImage} src={logo_image} alt='Logo'></img>
          <div className={styles.imageBox}>
            <img className={styles.userImage} src={user_image} alt='User'></img>
            <p className={styles.userName}>{myProfile.nickname}</p>
          </div>
          <div className={styles.iconBox} onClick={onClickHome}>
            <AiOutlineHome className={styles.homeIcon} />
            <button
              className={
                activeButton === "home"
                  ? `${styles.iconNotice} ${styles.optActive}`
                  : styles.iconNotice
              }
              onClick={onClickHome}
            >
              홈
            </button>
          </div>
          <div className={styles.iconBox} onClick={onClickMyPage}>
            <FiUser className={styles.userIcon} />
            <button
              className={
                activeButton === "mypage"
                  ? `${styles.iconNotice} ${styles.optActive}`
                  : styles.iconNotice
              }
              onClick={onClickMyPage}
            >
              프로필
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default LeftSide;
