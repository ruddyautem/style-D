import React, { useEffect } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import useCategoriesStore from "../../stores/categoriesStore";
import { IsLoading } from "../../components/category-preview/category-preview.styles";

const CategoriesPreview = () => {
  const { categoriesMap, isLoading, fetchCategories } = useCategoriesStore();

  useEffect(() => {
    isLoading && fetchCategories();
  }, [fetchCategories, isLoading]);

  console.log("Categories Map:", categoriesMap);

  return isLoading ? (
    <IsLoading>Chargement des articles...</IsLoading>
  ) : (
    Object.keys(categoriesMap).map((title) => (
      <CategoryPreview
        key={title}
        title={title}
        products={categoriesMap[title]}
      />
    ))
  );
};

export default CategoriesPreview;
