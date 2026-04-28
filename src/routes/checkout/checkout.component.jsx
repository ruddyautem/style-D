import CheckoutProduct from "../../components/checkout-item/checkout-product.component";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
  EmptyCartMessage,
  InfoCBContainer,
  InfoCB,
} from "./checkout.styles";
import useCartStore from "../../stores/cartStore";
import { createCheckoutSession } from "../../actions/createCheckoutSession";
import Button from "../../components/button/button.component";

const Checkout = () => {
  const { cartProducts, cartTotal } = useCartStore();

  const handleCheckout = async () => {
    try {
      const session = await createCheckoutSession(cartProducts);
      window.location.href = session.url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock><span>Article</span></HeaderBlock>
        <HeaderBlock><span>Description</span></HeaderBlock>
        <HeaderBlock><span>Quantité</span></HeaderBlock>
        <HeaderBlock><span>Prix</span></HeaderBlock>
        <HeaderBlock><span>Action</span></HeaderBlock>
      </CheckoutHeader>

      {cartProducts.length > 0 ? (
        <>
          {cartProducts.map((product) => (
            <CheckoutProduct key={product.id} product={product} />
          ))}

          <InfoCBContainer>
            MODE DÉMONSTRATION — UTILISEZ CETTE CARTE :
            <InfoCB>
              4242 4242 4242 4242 | 02/42 | CVC: 424
            </InfoCB>
          </InfoCBContainer>

          <Total>Total: {cartTotal} €</Total>
          
          <Button
            buttonType='base'
            onClick={handleCheckout}
            style={{ 
              marginTop: "30px", 
              marginLeft: "auto", 
              minWidth: "250px",
              height: "55px" 
            }}
          >
            Procéder au Paiement
          </Button>
        </>
      ) : (
        <EmptyCartMessage>Votre panier est vide</EmptyCartMessage>
      )}
    </CheckoutContainer>
  );
};

export default Checkout;