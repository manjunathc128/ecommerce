import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext/AppContext";
import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, dispatch } = useAppContext();
  const product = products.find((product) => product._id === id);
  const [selectedImage, setSelectedImage] = useState(product.images[0]); // Track selected image

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  // Dummy data for EMI, Warranty, Offers, and Reviews
  const dummyEMI = "2084.88";
  const dummyWarranty = "1 Year Manufacturer Warranty";
  const dummyOffers = "6.5% Upto 4.3k Off On ICICI Credit Card";
  const dummyReviews = [
    {
      text: "Great product! Very satisfied with the performance.",
      author: "John Doe",
    },
    {
      text: "Excellent quality and fast delivery.",
      author: "Jane Smith",
    },
    {
      text: "Good value for money.",
      author: "Alice Johnson",
    },
  ];

  return (
    <div className={styles.productDetailContainer}>
      {/* Section for Vertical Images and Product Info */}
      <section className={styles.mainSection}>
        {/* Aside for Vertical Images */}
        <aside className={styles.imageSidebar}>
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product ${index + 1}`}
              className={`${styles.sidebarImage} ${
                selectedImage === image ? styles.selectedImage : ""
              }`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </aside>

        {/* Main Image Container */}
        <div className={styles.mainImageContainer}>
          <img
            src={selectedImage}
            alt={product.name}
            className={styles.mainImage}
          />
        </div>

        {/* Product Info Container */}
        <div className={styles.productInfoContainer}>
          <h2 className={styles.productName}>{product.name}</h2>
          <p className={styles.productPrice}>₹{product.price}</p>
          <p className={styles.productDiscount}>{product.discount}% OFF</p>
          <p className={styles.productMRP}>M.R.P.: ₹{product.mrp}</p>
          <p className={styles.productEMI}>
            EMI Available from ₹{dummyEMI}/month
          </p>

          {/* Star Rating and Reviews */}
          <div className={styles.ratingContainer}>
            <div className={styles.starRating}>
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={
                    index < product.rating
                      ? styles.filledStar
                      : styles.emptyStar
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <p className={styles.reviewCount}>({product.numReviews} reviews)</p>
          </div>

          {/* Product Description */}
          <p className={styles.productDescription}>{product.description}</p>

          {/* Add to Cart Button */}
          <button onClick={handleAddToCart} className={styles.addToCartButton}>
            Add to Cart
          </button>

          {/* Warranty and Offers */}
          <div className={styles.warrantyContainer}>
            <p className={styles.warrantyText}>Warranty: {dummyWarranty}</p>
            <p className={styles.offersText}>Offers: {dummyOffers}</p>
          </div>

          {/* Customer Reviews */}
          <div className={styles.reviewsContainer}>
            <h3 className={styles.reviewsHeading}>Customer Reviews</h3>
            {dummyReviews.map((review, index) => (
              <div key={index} className={styles.reviewCard}>
                <p className={styles.reviewText}>{review.text}</p>
                <p className={styles.reviewAuthor}>- {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section for Similar Products */}
      <section className={styles.similarProductsSection}>
        <h3 className={styles.similarProductsHeading}>Similar Products</h3>
        <div className={styles.similarProductsGrid}>
          {products
            .filter(
              (p) =>
                p.category === product.category &&
                p.subcategory === product.subcategory &&
                p._id !== product._id // Exclude the current product
            )
            .slice(0, 5) // Limit to 5 similar products
            .map((similarProduct) => (
              <div
                key={similarProduct._id}
                className={styles.similarProductCard}
                onClick={() => navigate(`/product/${similarProduct._id}`)} // Navigate to the similar product's detail page
              >
                <img
                  src={similarProduct.images[0]}
                  alt={similarProduct.name}
                  className={styles.similarProductImage}
                />
                <p className={styles.similarProductName}>
                  {similarProduct.name}
                </p>
                <p className={styles.similarProductPrice}>
                  ₹{similarProduct.price}
                </p>
                <p className={styles.similarProductDiscount}>
                  {similarProduct.discount}% OFF
                </p>
                <p className={styles.similarProductMRP}>
                  M.R.P.: ₹{similarProduct.mrp}
                </p>
              </div>
            ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2023 Your E-Commerce Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProductDetail;
