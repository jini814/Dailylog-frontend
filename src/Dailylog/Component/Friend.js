import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import styles from "./Menu.module.css";
import { IoMdSearch } from "react-icons/io";
import user_image from "../Image/user.png";

function Friend() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      {isMobile ? (
        <>
          <IoMdSearch className={styles.mobileSearchIcon} />
        </>
      ) : (
        <div className={styles.pcFriend}>
          <div className={styles.searchBox}>
            <IoMdSearch className={styles.searchIcon} />
            <input
              className={styles.searchBoxInput}
              type='text'
              id='text'
              name='text'
              required
              placeholder='검색어를 입력하세요'
            />
          </div>
          <div className={styles.friendRecommendBox}>
            <p className={styles.friendBoxNotice}>친구추천</p>
            <div className={styles.friendBox}>
              <img
                className={styles.friendImg}
                src={user_image}
                alt='User'
              ></img>
              <p className={styles.friendName}>김정우</p>
              <button className={styles.friendAddBtn}>추가</button>
            </div>
            <div className={styles.friendBox}>
              <img
                className={styles.friendImg}
                src={user_image}
                alt='User'
              ></img>
              <p className={styles.friendName}>황인준</p>
              <button className={styles.friendAddBtn}>추가</button>
            </div>
            <p className={styles.friendMoreBtn}>+ 더보기</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Friend;
