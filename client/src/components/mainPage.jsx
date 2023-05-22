import React from "react";
import startImage from "../assets/img/start/3.jpeg";
import styles from "./mainPage.module.css";

const MainPage = () => (
  <div className={styles.main}>
    <img src={startImage} alt="" className={styles.logo} />

    <h1 className={styles.header}>
      Техническая учеба персонала Каменск-Шахтинского ЛПУМГ
      {/* Приложение для
      проведения технической учебы персонала */}
    </h1>
  </div>
);

export default MainPage;
