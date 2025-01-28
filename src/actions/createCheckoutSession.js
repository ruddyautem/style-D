import Stripe from "stripe";
import useCartStore from "../stores/cartStore"; // Assuming this is where you manage user state
import useUserStore from "../stores/userStore";

const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
});

export const createCheckoutSession = async (cartItems) => {
  try {
    const { currentUser } = useUserStore.getState(); // Get the current user from UserStore
    const displayName = currentUser?.displayName || ""; // Get displayName from current user

    if (!currentUser) {
      throw new Error("User is not authenticated");
    }

    // Step 1: Create Customer with displayName and email
    const customer = await stripe.customers.create({
      name: displayName, // Use displayName as full name
      email: currentUser.email, // User email from Firebase
    });

    // Step 2: Create Checkout Session tied to the created customer
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
      customer: customer.id, // Pass the customer ID here
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
