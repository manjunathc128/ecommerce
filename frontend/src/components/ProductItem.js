import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext/AppContext";
import styles from "./ProductItem.module.css"; // Import CSS Module

const ProductItem = ({ product }) => {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className={styles.productCard}>
      {/* Display the first image from the images array */}
      <div className={styles.imageCarousel}>
        <img
          src={product.images[0]} // Access the first image
          alt={product.name}
          className={styles.carouselImage}
          onClick={() => navigate(`/${product.category}/${product._id}`)}
        />
      </div>

      {/* Product Details */}
      <h3 className={styles.productName}>{product.name}</h3>
      <p className={styles.brand}>{product.brand}</p>
      <p className={styles.price}>₹{product.price}</p>
      <p className={styles.mrp}>₹{product.mrp}</p>
      <p className={styles.offer}>{product.offer}% OFF</p>
      <p className={styles.rating}>
        ⭐ {product.rating} ({product.numReviews} reviews)
      </p>
      <p className={styles.stock}>
        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
      </p>

      {/* Add to Cart Button */}
      <button
        onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
        className={styles.addToCartButton}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
