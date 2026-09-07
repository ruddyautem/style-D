import { useEffect } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import useCategoriesStore from "../../stores/categoriesStore";
import { useTranslation } from "../../stores/languageStore";
import { IsLoading } from "../../components/category-preview/category-preview.styles";
import { ShopPageWrapper } from "../category/category.styles";

const CategoriesPreview = () => {
  const { categoriesMap, isLoading, fetchCategories } = useCategoriesStore();
  const { t } = useTranslation();

  useEffect(() => {
    // Only fetch if map is empty
    if (Object.keys(categoriesMap).length === 0) {
      fetchCategories();
    }
  }, [fetchCategories, categoriesMap]);

  return (
    <ShopPageWrapper>
      {isLoading ? (
        <IsLoading>{t("categories.loading")}</IsLoading>
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
    </ShopPageWrapper>
  );
};

export default CategoriesPreview;