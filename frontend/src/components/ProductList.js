import React from "react";
import ProductItem from "./ProductItem";
import { useAppContext } from "../context/AppContext/AppContext";
// import { useParams } from "react-router-dom";
import styles from "./ProductList.module.css";

const ProductList = () => {
  // const { category } = useParams();
  const { products, search, category: selectedCategory } = useAppContext();

  let filteredProducts = products;

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter((product) => {
      return (
        product.category.toLowerCase() === selectedCategory.toLowerCase() ||
        product.subcategory?.toLowerCase() === selectedCategory.toLowerCase()
      );
    });
  }

  if (selectedCategory.toLowerCase() === "home") {
    filteredProducts = products;
  }

  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  return (
    <div className={styles.productListContainer}>
      {filteredProducts.length === 0 ? (
        <p className={styles.noProductsMessage}>No products found</p>
      ) : (
        <div className={styles.productGrid}>
          {filteredProducts.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
