import Stripe from "stripe";
import useCartStore from "../stores/cartStore";

const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
});

export const createCheckoutSession = async (cartItems) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            images: [item.imageUrl],
          },
          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${window.location.origin}/failure`,
      locale: "fr",
    });

    // Save the order using the cart store function
    useCartStore.getState().saveOrder(session.id, cartItems);

    return session;
  } catch (error) {
    console.error(
      "Erreur lors de la création de la session de paiement :",
      error
    );
    throw error;
  }
};
