import React, { useEffect } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import useCategoriesStore from "../../stores/categoriesStore";
import { IsLoading } from "../../components/category-preview/category-preview.styles";

const CategoriesPreview = () => {
  const { categoriesMap, isLoading, fetchCategories } = useCategoriesStore();

  useEffect(() => {
    // Only fetch if map is empty
    if (Object.keys(categoriesMap).length === 0) {
      fetchCategories();
    }
  }, [fetchCategories, categoriesMap]);

  return (
    <div style={{ padding: '20px 0' }}>
      {isLoading ? (
        <IsLoading>Chargement de la collection...</IsLoading>
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview
              key={title}
              title={title}
              products={products}
            />
          );
        })
      )}
    </div>
  );
};

export default CategoriesPreview;