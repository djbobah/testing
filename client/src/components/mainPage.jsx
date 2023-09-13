import React, { useEffect } from "react";
import startImage from "../assets/img/start/3.jpeg";
import styles from "./mainPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadUsers } from "../store/users";

const MainPage = () => {
  const dataStatus = useSelector(getDataStatus());
  const dispatch = useDispatch();
  useEffect(() => {
    if (!dataStatus) {
      dispatch(loadUsers());
    }
  }, []);
  return (
    <div className={styles.main}>
      <img src={startImage} alt="" className={styles.logo} />

      <h1 className={styles.header}>
        Техническая учеба персонала Каменск-Шахтинского ЛПУМГ
        {/* Приложение для
      проведения технической учебы персонала */}
      </h1>
    </div>
  );
};

export default MainPage;
