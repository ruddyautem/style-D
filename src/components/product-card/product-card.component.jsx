import { useNavigate, useParams } from "react-router-dom";
import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles.jsx";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const navigate = useNavigate();
  const { category } = useParams();

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
          alt={name}
          loading="lazy"
        />
      </div>
      <Footer>
        <Name>{name}</Name>
        <Price>{price} €</Price>
      </Footer>
    </ProductCardContainer>
  );
};

export default ProductCard;