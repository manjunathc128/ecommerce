import React from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import ProductList from "./ProductList";

const CategoryPage = () => {
  const { category } = useParams();
  const { products } = useAppContext();
  const CatProducts = products.filter(
    (p) => p.category.toLowerCase() === category
  );

  return <ProductList products={CatProducts} />;
};

export default CategoryPage;
