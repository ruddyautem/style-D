import {
  CheckoutProductContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-product.styles.jsx";
import useCartStore from "../../stores/cartStore";

const CheckoutProduct = ({ product }) => {
  const { handleProductQuantity } = useCartStore();

  return (
    <CheckoutProductContainer>
      <ImageContainer>
        <img src={product.imageUrl} alt={`${product.name}`} />
      </ImageContainer>
      <BaseSpan>{product.name}</BaseSpan>
      <Quantity>
        <Arrow onClick={() => handleProductQuantity(product, "remove")}>
          &#10094;
        </Arrow>
        <Value>{product.quantity}</Value>
        <Arrow onClick={() => handleProductQuantity(product, "add")}>
          &#10095;
        </Arrow>
      </Quantity>
      <BaseSpan>{product.price} €</BaseSpan>
      <RemoveButton onClick={() => handleProductQuantity(product, "clear")}>
        &#10005;
      </RemoveButton>
    </CheckoutProductContainer>
  );
};

export default CheckoutProduct;