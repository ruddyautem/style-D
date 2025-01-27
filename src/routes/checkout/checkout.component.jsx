import CheckoutProduct from "../../components/checkout-item/checkout-product.component";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
  EmptyCartMessage,
} from "./checkout.styles";
import useCartStore from "../../stores/cartStore";
import { createCheckoutSession } from "../../actions/createCheckoutSession";
import Button from "../../components/button/button.component";

const Checkout = () => {
  const { cartProducts, cartTotal } = useCartStore();

  const handleCheckout = async () => {
    try {
      const session = await createCheckoutSession(cartProducts);

      // Redirect to Stripe Checkout
      window.location.href = session.url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

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
      {cartProducts.length > 0 ? (
        <>
          {cartProducts.map((product) => (
            <CheckoutProduct key={product.id} product={product} />
          ))}
          <Total>Total: {cartTotal} €</Total>
          <Button
            buttonType='base'
            onClick={handleCheckout}
            style={{ marginTop: "10px", marginLeft: "auto" }}
          >
            Payez vos articles
          </Button>
        </>
      ) : (
        <EmptyCartMessage>Aucun Article dans votre panier</EmptyCartMessage>
      )}
    </CheckoutContainer>
  );
};

export default Checkout;

//TODO: LEFT-RIGHT COLS

// import CheckoutProduct from "../../components/checkout-item/checkout-product.component";
// import {
//   CheckoutContainer,
//   LeftColumn,
//   RightColumn,
//   CheckoutHeader,
//   HeaderBlock,
//   Total,
//   EmptyCartMessage,
//   CheckoutActionContainer,
// } from "./checkout.styles";
// import useCartStore from "../../stores/cartStore";
// import { createCheckoutSession } from "../../actions/createCheckoutSession";
// import Button from "../../components/button/button.component";

// const Checkout = () => {
//   const { cartProducts, cartTotal } = useCartStore();

//   const handleCheckout = async () => {
//     try {
//       const session = await createCheckoutSession(cartProducts);

//       // Redirect to Stripe Checkout
//       window.location.href = session.url;
//     } catch (error) {
//       console.error("Error creating checkout session:", error);
//     }
//   };

//   return (
//     <CheckoutContainer>
//       <LeftColumn>
//         <CheckoutHeader>
//           <HeaderBlock>
//             <span>Article</span>
//           </HeaderBlock>
//           <HeaderBlock>
//             <span>Description</span>
//           </HeaderBlock>
//           <HeaderBlock>
//             <span>Quantité</span>
//           </HeaderBlock>
//           <HeaderBlock>
//             <span>Prix</span>
//           </HeaderBlock>
//           <HeaderBlock>
//             <span>Supprimer</span>
//           </HeaderBlock>
//         </CheckoutHeader>
//         {cartProducts.length > 0 ? (
//           cartProducts.map((product) => (
//             <CheckoutProduct key={product.id} product={product} />
//           ))
//         ) : (
//           <EmptyCartMessage>Aucun Article dans votre panier</EmptyCartMessage>
//         )}
//       </LeftColumn>
//       <RightColumn>
//         <CheckoutActionContainer>
//           <Total>Total: {cartTotal} €</Total>
//           <Button
//             buttonType="base"
//             onClick={handleCheckout}
//             style={{ marginTop: "10px" }}
//           >
//             Payez vos articles
//           </Button>
//         </CheckoutActionContainer>
//       </RightColumn>
//     </CheckoutContainer>
//   );
// };

// export default Checkout;
