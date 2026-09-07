import ProductCard from "../product-card/product-card.component";
import { useTranslation } from "../../stores/languageStore";
import {
  CategoryPreviewContainer,
  Title,
  Preview,
  TitleContainer,
  ViewAllLink
} from "./category-preview.styles";

const CategoryPreview = ({ title, products }) => {
  const { t } = useTranslation();

  const getCategoryLabel = (rawTitle) => {
    const key = rawTitle.toLowerCase();
    const map = {
      hats: "hats",
      chapeaux: "hats",
      jackets: "jackets",
      vestes: "jackets",
      sneakers: "sneakers",
      baskets: "sneakers",
      womens: "womens",
      femme: "womens",
      femmes: "womens",
      mens: "mens",
      homme: "mens",
      hommes: "mens",
    };
    const mappedKey = map[key];
    return mappedKey ? t(`categories.${mappedKey}`).toUpperCase() : rawTitle.toUpperCase();
  };

  return (
    <CategoryPreviewContainer>
      <TitleContainer>
        <Title to={title}>{getCategoryLabel(title)}</Title>
        <ViewAllLink to={title}>{t("categories.viewCollection")}</ViewAllLink>
      </TitleContainer>
      
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;