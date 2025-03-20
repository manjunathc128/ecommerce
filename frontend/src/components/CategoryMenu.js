// import styles from "./CategoryMenu.module.css";
// import { Link } from "react-router-dom";
// const menuItems = [
//   { category: "Home" },
//   { category: "Fashion", subCategory: ["men", "women"] },
//   {
//     category: "Electronics",
//     subCategory: ["Mobile", "Laptop", "Television", "Large Appliances"],
//   },
//   {
//     category: "Lifestyle",
//     subCategory: ["Kitchenware", "sports Fitness", "Bags"],
//   },
//   { category: "Footware", subCategory: ["men Footware", "women Footware"] },
//   {
//     category: "Groceries",
//     subCategory: [
//       "Biscuits Drinks and Packaged Foods",
//       "Rice Flour Wheet and Salt",
//       "Packed",
//       "oil and ghee",
//     ],
//   },
//   { category: "wellness", subCategory: ["skin care", "Fragrances"] },
// ];

// export default function CategoryMenu() {
//   return (
//     <div>
//       <nav className={`${styles.menu}`}>
//         <ul className={`${styles.list}`}>
//           {menuItems.map((item, index) => (
//             <li key={index} className={`${styles.listItem} ${styles.dropdown}`}>
//               <Link to="/">{item.category}</Link>

//               {item.subCategory && (
//                 <ul className={`${styles.dropdownContent}`}>
//                   {item.subCategory.map((item, index) => (
//                     <li key={index} className={`${styles.listItem}`}>
//                       <Link to="/">{item}</Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// }

import React from "react";
import styles from "./CategoryMenu.module.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext/AppContext";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const menuItems = [
  { category: "Home" },
  { category: "Fashion", subCategory: ["men", "women"] },
  {
    category: "Electronics",
    subCategory: ["Mobile", "Laptop", "Television", "Large Appliances"],
  },
  {
    category: "Lifestyle",
    subCategory: ["Kitchenware", "sports Fitness", "Bags"],
  },
  { category: "Footware", subCategory: ["men Footware", "women Footware"] },
  {
    category: "Groceries",
    subCategory: [
      "Biscuits Drinks and Packaged Foods",
      "Rice Flour Wheet and Salt",
      "Packed",
      "oil and ghee",
    ],
  },
  { category: "wellness", subCategory: ["skin care", "Fragrances"] },
];

export default function CategoryMenu() {
  const { dispatch } = useAppContext();

  const handleCategoryClick = (category) => {
    dispatch({ type: "SET_CATEGORY", payload: category });
  };

  return (
    <div>
      <nav className={`${styles.menu}`}>
        <ul className={`${styles.list}`}>
          {menuItems.map((item, index) => (
            <li key={index} className={`${styles.listItem} ${styles.dropdown}`}>
              <div className={styles.listItemContainer}>
                <Link
                  to={`${item.category}`}
                  onClick={() => {
                    handleCategoryClick(item.category);
                  }}
                >
                  {item.category}
                </Link>
                {item.subCategory ? (
                  <ArrowDropDownIcon className={styles.listArrow} />
                ) : null}
              </div>
              {item.subCategory && (
                <ul className={`${styles.dropdownContent}`}>
                  {item.subCategory.map((subItem, subIndex) => (
                    <li key={subIndex} className={`${styles.listItem}`}>
                      <Link
                        to={`${subItem}`}
                        onClick={() => {
                          handleCategoryClick(subItem);
                        }}
                      >
                        {subItem}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
