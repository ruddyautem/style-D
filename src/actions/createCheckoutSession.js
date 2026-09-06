import Stripe from "stripe";
import useUserStore from "../stores/userStore";

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
});

export const createCheckoutSession = async (cartItems) => {
  try {
    const { currentUser } = useUserStore.getState();
    const displayName = currentUser?.displayName || "";

    if (!currentUser) {
      throw new Error("User is not authenticated");
    }

    // Step 1: Create Customer with displayName and email
    const customer = await stripe.customers.create({
      name: displayName,
      email: currentUser.email,
    });

    // Step 2: Create Checkout Session tied to the created customer
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            images: item.imageUrl ? [item.imageUrl] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      customer: customer.id,
      success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${window.location.origin}/failure`,
      locale: "fr",
    });

    return session;
  } catch (error) {
    console.error("Erreur lors de la création de la session de paiement :", error);
    throw error;
  }
};

