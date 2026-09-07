import useUserStore from "../stores/userStore";
import useLanguageStore, { getLocalizedProductName } from "../stores/languageStore";

export const createCheckoutSession = async (cartItems) => {
  try {
    const { currentUser } = useUserStore.getState();
    const { currentLanguage } = useLanguageStore.getState();

    if (!currentUser) {
      throw new Error("User is not authenticated");
    }

    const localizedCartItems = cartItems.map((item) => ({
      ...item,
      name: getLocalizedProductName(item, currentLanguage),
    }));

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems: localizedCartItems,
        userEmail: currentUser.email,
        userName: currentUser.displayName || currentUser.email,
        origin: window.location.origin,
        locale: currentLanguage === "en" ? "en" : "fr",
      }),
    });

    if (!response.ok) {
      let errorMessage = `Erreur serveur (${response.status})`;
      try {
        const text = await response.text();
        if (text) {
          const parsed = JSON.parse(text);
          if (parsed?.error) errorMessage = parsed.error;
        }
      } catch {
        // Non-JSON response
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la création de la session de paiement :", error);
    throw error;
  }
};
