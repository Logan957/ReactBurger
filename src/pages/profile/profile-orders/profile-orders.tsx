import React, { memo } from "react";
import NavBar from "../../../components/profile/nav-bar";
import styles from "./profile-orders.module.css";

const ProfileOrdersPage: React.FC = () => {
  return (
    <>
      <div className=" d-flex justify-content-center">
        <div className={`${styles.content} d-flex justify-content-between`}>
          <NavBar />
          <div className={styles.form}>Заявки</div>
        </div>
      </div>
    </>
  );
};

export default memo(ProfileOrdersPage);
