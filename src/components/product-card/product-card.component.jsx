import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
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
      toast.info("Veuillez vous connecter pour enregistrer votre panier.");
      navigate("/auth");
      return;
    }

    // Trigger the "Added" state
    setIsAdded(true);

    await handleProductQuantity(
      { id: product.id, name, imageUrl, price },
      "add"
    );

    // Sonner notification
    toast.success(`${name} ajouté au panier`, {
      description: `${price} €`,
    });

    // Reset button text after short delay
    setTimeout(() => {
      setIsAdded(false);
    }, 500);
  };

  // Logic for dynamic button text
  const getButtonText = () => {
    if (isAdded) return "Ajouté !";
    if (!currentUser) return "Se Connecter";
    return "Ajouter au panier";
  };

  return (
    <ProductCardContainer>
      <div className="img-container">
        <img
          src={`https://wsrv.nl/?url=${encodeURIComponent(imageUrl)}&w=600&output=webp`}
          alt={name}
          loading="lazy"
        />
        <Button
          buttonType={isAdded ? BUTTON_TYPE_CLASSES.base : BUTTON_TYPE_CLASSES.inverted}
          onClick={handleAddToCart}
          disabled={isAdded}
        >
          {getButtonText()}
        </Button>
      </div>
      <Footer>
        <Name>{name}</Name>
        <Price>{price} €</Price>
      </Footer>
    </ProductCardContainer>
  );
};

export default ProductCard;