import useUserStore from "../stores/userStore";

export const createCheckoutSession = async (cartItems) => {
  try {
    const { currentUser } = useUserStore.getState();

    if (!currentUser) {
      throw new Error("User is not authenticated");
    }

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems,
        userEmail: currentUser.email,
        userName: currentUser.displayName || currentUser.email,
        origin: window.location.origin,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Erreur serveur: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la création de la session de paiement :", error);
    throw error;
  }
};
