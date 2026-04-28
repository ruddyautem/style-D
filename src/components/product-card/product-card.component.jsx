import { useState } from "react";
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
  const [isAdded, setIsAdded] = useState(false);
  
  const { handleProductQuantity } = useCartStore();
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    
    if (!currentUser) {
      navigate("/auth");
      return;
    }

    // Trigger the "Added" state
    setIsAdded(true);

    await handleProductQuantity(
      { id: product.id, name, imageUrl, price },
      "add"
    );

    // Reset button text after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  // Logic for dynamic button text
  const getButtonText = () => {
    if (isAdded) return "Ajouté !";
    if (!currentUser) return "Se Connecter";
    return "Ajouter au panier";
  };

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} loading="lazy" />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}€</Price>
      </Footer>
      <Button
        buttonType={isAdded ? BUTTON_TYPE_CLASSES.base : BUTTON_TYPE_CLASSES.inverted}
        onClick={handleAddToCart}
        disabled={isAdded} // Optional: disable while showing "Added" to prevent double-clicks
      >
        {getButtonText()}
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;