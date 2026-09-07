import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "../../stores/languageStore";
import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles.jsx";

const ProductCard = ({ product }) => {
  const { price, imageUrl } = product;
  const navigate = useNavigate();
  const { category } = useParams();
  const { getProductName } = useTranslation();
  const displayName = getProductName(product);

  const handleCardClick = () => {
    if (category) {
      navigate(`/shop/${category}/${product.id}`);
    }
  };

  return (
    <ProductCardContainer onClick={handleCardClick}>
      <div className="img-container">
        <img
          src={`https://wsrv.nl/?url=${encodeURIComponent(imageUrl)}&w=600&output=webp`}
          alt={displayName}
          loading="lazy"
        />
        <Price className="floating-price">{price} €</Price>
      </div>
      <Footer>
        <Name>{displayName}</Name>
      </Footer>
    </ProductCardContainer>
  );
};

export default ProductCard;