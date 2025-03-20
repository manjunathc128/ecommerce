import React from "react";
import styles from "./Logo.module.css";
import img from "../assets/Ecommerce.jpg";
export default function Logo() {
  return (
    <div className={styles.logoContainer}>
      <img src={img} alt="Logo" />
    </div>
  );
}
