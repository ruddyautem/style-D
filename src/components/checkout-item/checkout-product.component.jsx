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
  const cartStore = useCartStore();

  const { addProductToCart, removeProductFromCart, clearProductFromCart } =
    cartStore;

  const clearProductHandler = (productId) => {
    clearProductFromCart(productId);
  };

  const addProductHandler = (product) => {
    addProductToCart({
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: 1,
    });
  };

  const removeProductHandler = (productId) => {
    removeProductFromCart(productId);
  };

  return (
    <CheckoutProductContainer>
      <ImageContainer>
        <img src={product.imageUrl} alt={`${product.name}`} />
      </ImageContainer>
      <BaseSpan>{product.name}</BaseSpan>
      <Quantity>
        <Arrow onClick={() => removeProductHandler(product.id)}>&#10094;</Arrow>
        <Value>{product.quantity}</Value>
        <Arrow onClick={() => addProductHandler(product)}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>${product.price}</BaseSpan>
      <RemoveButton onClick={() => clearProductHandler(product.id)}>
        &#10005;
      </RemoveButton>
    </CheckoutProductContainer>
  );
};

export default CheckoutProduct;
