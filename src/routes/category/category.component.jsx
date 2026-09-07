import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import useCategoriesStore from "../../stores/categoriesStore";
import { useTranslation } from "../../stores/languageStore";
import {
  CategoryPageWrapper,
  CategoryContainer,
} from "./category.styles";
import { IsLoading } from "../../components/category-preview/category-preview.styles";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap, isLoading, fetchCategories } = useCategoriesStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (Object.keys(categoriesMap).length === 0) {
      fetchCategories();
    }
  }, [fetchCategories, categoriesMap]);

  const products = categoriesMap[category] || [];

  return (
    <CategoryPageWrapper>
      {isLoading ? (
        <IsLoading style={{ textAlign: "center", width: "100%" }}>
          {t("categories.loading")}
        </IsLoading>
      ) : (
        <CategoryContainer>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {products.length === 0 && (
            <p style={{ textAlign: "center", width: "100%" }}>
              {t("categories.empty")}
            </p>
          )}
        </CategoryContainer>
      )}
    </CategoryPageWrapper>
  );
};

export default Category;