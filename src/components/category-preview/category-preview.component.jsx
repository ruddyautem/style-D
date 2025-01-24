import React, { useEffect } from "react";
import ProductCard from "../product-card/product-card.component";
import {
  CategoryPreviewContainer,
  Title,
  Preview,
  IsLoading,
} from "./category-preview.styles";
import useCategoriesStore from "../../stores/categoriesStore";

const CategoryPreview = ({ title, products }) => {
  const { isLoading, fetchCategories } = useCategoriesStore();

  useEffect(() => {
    isLoading && fetchCategories();
  }, [isLoading, fetchCategories]);

  console.log("Category:", title);
  console.log("Products:", products);

  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {isLoading ? (
          <IsLoading>Chargement des articles...</IsLoading>
        ) : (
          products
            .filter((_, idx) => idx < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        )}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;