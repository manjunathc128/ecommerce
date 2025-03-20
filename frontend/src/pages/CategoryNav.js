// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAppContext } from "./context/AppContext";
import CategoryMenu from "../components/CategoryMenu";

import styles from "./CategoryNav.module.css";

const CategoryNav = () => {
  return (
    <div className={`${styles.nav}`}>
      <CategoryMenu></CategoryMenu>
    </div>
  );
};

export default CategoryNav;
