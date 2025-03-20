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

{
  /* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 100"
        width="300"
        height="100"
      >
        <defs>
          <linearGradient id="bagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#FF7E5F", stopOpacity: 1 }}>
              <animate
                attributeName="stop-color"
                values="#FF7E5F;#FEB47B;#FF7E5F"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop
              offset="100%"
              style={{ stopColor: "#FEB47B", stopOpacity: 1 }}
            >
              <animate
                attributeName="stop-color"
                values="#FEB47B;#FF7E5F;#FEB47B"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>

        <g transform="translate(20, 20)">
          <path
            d="M10,50 L30,50 L35,10 L5,10 Z"
            fill="url(#bagGradient)"
            stroke="#333"
            strokeWidth="2"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 -5; 0 0"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M20,20 L20,0"
            stroke="#333"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 -5; 0 0"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M15,0 L25,0"
            stroke="#333"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 -5; 0 0"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
        </g>

        <text x="60" y="50" className={styles.logoText}>
          ECommerce
        </text>
        <text x="60" y="70" className={styles.logoSubtext}>
          Your Online Shop
        </text>
      </svg> */
}
