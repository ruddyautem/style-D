import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles.jsx";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import useCartStore from "../../stores/cartStore.js";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addProductToCart } = useCartStore();

  const handleAddToCart = () => {
    addProductToCart({
      id: product.id,
      name,
      imageUrl,
      price,
    });
  };

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
        Ajouter au Panier
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;