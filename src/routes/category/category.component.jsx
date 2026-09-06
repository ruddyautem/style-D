import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import useCategoriesStore from "../../stores/categoriesStore";
import {
  CategoryPageWrapper,
  CategoryContainer,
} from "./category.styles";
import { IsLoading } from "../../components/category-preview/category-preview.styles";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap, isLoading, fetchCategories } = useCategoriesStore();

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
          Chargement de la collection...
        </IsLoading>
      ) : (
        <CategoryContainer>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {products.length === 0 && (
            <p style={{ textAlign: "center", width: "100%" }}>
              Aucun article disponible.
            </p>
          )}
        </CategoryContainer>
      )}
    </CategoryPageWrapper>
  );
};

export default Category;