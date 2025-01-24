import CheckoutProduct from "../../components/checkout-item/checkout-product.component";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles";
import useCartStore from "../../stores/cartStore";

const Checkout = () => {
  const { cartProducts, cartTotal } = useCartStore();

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Article</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantité</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Prix</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Supprimer</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartProducts.map((product) => (
        <CheckoutProduct key={product.id} product={product} />
      ))}
      <Total>Total: {cartTotal} €</Total>
    </CheckoutContainer>
  );
};

export default Checkout;
