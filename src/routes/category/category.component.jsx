import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import useCategoriesStore from "../../stores/categoriesStore";

import { CategoryTitle, CategoryContainer } from "./category.styles";
import { IsLoading } from "../../components/category-preview/category-preview.styles";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap, isLoading, fetchCategories } = useCategoriesStore();

  useEffect(() => {
    isLoading && fetchCategories();
  }, [fetchCategories, isLoading]);

  console.log("Category:", category);
  console.log("Categories Map:", categoriesMap);

  const products = categoriesMap[category];

  console.log("Products for category:", products);

  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {isLoading ? (
          <IsLoading>Chargement des articles...</IsLoading>
        ) : products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Aucun article disponible dans cette catégorie.</p>
        )}
      </CategoryContainer>
    </>
  );
};

export default Category;
