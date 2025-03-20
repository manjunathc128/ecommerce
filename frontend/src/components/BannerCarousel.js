import React, { useState } from "react";
import styles from "./BannerCarousel.module.css";

// Import images directly
import banner1 from "../assets/Image1.jpg";
import banner2 from "../assets/Image2.jpg";
import banner3 from "../assets/Image3.jpg";

const BannerCarousel = () => {
  const images = [banner1, banner2, banner3];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle manual navigation
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className={styles.carousel}>
      {/* Left Arrow */}
      <button className={styles.arrowLeft} onClick={goToPrevious}>
        &lt;
      </button>

      {/* Banner Images */}
      <div className={styles.imageContainer}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Banner ${index + 1}`}
            className={`${styles.bannerImage} ${
              index === currentIndex ? styles.active : ""
            }`}
          />
        ))}
      </div>

      {/* Right Arrow */}
      <button className={styles.arrowRight} onClick={goToNext}>
        &gt;
      </button>
    </div>
  );
};

export default BannerCarousel;
