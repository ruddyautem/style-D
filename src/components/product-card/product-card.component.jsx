import { useNavigate } from "react-router-dom";
import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles.jsx";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import useCartStore from "../../stores/cartStore.js";
import useUserStore from '../../stores/userStore.js';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { handleProductQuantity } = useCartStore(); // Use handleProductQuantity from cartStore
  const { currentUser } = useUserStore();
  
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!currentUser) {
      // Navigate to the auth page if not logged in
      navigate("/auth");
    } else {
      // Use handleProductQuantity to add the product (+1 quantity)
      await handleProductQuantity(
        { id: product.id, name, imageUrl, price },
        "add"
      );
    }
  };

  const buttonText = currentUser ? "Ajouter au Panier" : "Se connecter pour ajouter au panier";

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price} €</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={handleAddToCart}
      >
        {buttonText}
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;