import ProductCard from "../product-card/product-card.component";
import {
  CategoryPreviewContainer,
  Title,
  Preview,
  TitleContainer,
  ViewAllLink
} from "./category-preview.styles";

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <TitleContainer>
        <Title to={title}>{title}</Title>
        <ViewAllLink to={title}>Découvrir la collection</ViewAllLink>
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