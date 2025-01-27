import { create } from "zustand";
import {
  fetchUserCart,
  saveCartToFirestore,
  clearUserCart,
  saveOrderToFirestore,
  saveFailedOrderToFirestore,
} from "../utils/firestoreInteractions";

const useCartStore = create((set, get) => {
  // Helper function to update cart state
  const updateCartState = (cartItems) => {
    const cartCount = cartItems.reduce((sum, p) => sum + p.quantity, 0);
    const cartTotal = cartItems.reduce((sum, p) => sum + p.price * p.quantity, 0);
    set({ cartProducts: cartItems, cartCount, cartTotal });
  };

  // Helper function to update Firestore cart
  const updateFirestoreCart = async (cartItems) => {
    const userId = get().userId;
    if (userId) await saveCartToFirestore(userId, cartItems);
  };

  // Helper function to ensure user is logged in before performing actions
  const withUserCheck = (fn) => async (...args) => {
    if (!get().userId) return;
    await fn(...args);
  };

  // Function to handle adding, removing, or clearing a product
  const handleProductQuantity = async (product, action) => {
    const { cartProducts } = get();
    let updatedCart;

    switch (action) {
      case "add":
        updatedCart = cartProducts.some((p) => p.id === product.id)
          ? cartProducts.map((p) =>
              p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            )
          : [...cartProducts, { ...product, quantity: 1 }];
        break;

      case "remove":
        updatedCart = cartProducts
          .map((p) => {
            if (p.id === product.id) {
              const newQuantity = p.quantity - 1;
              return newQuantity > 0 ? { ...p, quantity: newQuantity } : null;
            }
            return p;
          })
          .filter(Boolean); // Remove products with null (quantity <= 0)
        break;

      case "clear":
        updatedCart = cartProducts.filter((p) => p.id !== product.id);
        break;

      default:
        return;
    }

    // Update local state
    updateCartState(updatedCart);

    // Update Firestore if user is logged in
    await updateFirestoreCart(updatedCart);
  };

  return {
    isCartOpen: false,
    cartProducts: [],
    cartCount: 0,
    cartTotal: 0,
    userId: null,
    cartError: null,

    setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

    setUserId: async (id) => {
      set({ userId: id });
      if (id) {
        try {
          const cartItems = await fetchUserCart(id);
          updateCartState(cartItems);
        } catch (error) {
          set({ cartError: "Erreur de chargement du panier" });
        }
      }
    },

    resetLocalCart: () => set({ cartProducts: [], cartCount: 0, cartTotal: 0 }),

    handleProductQuantity,

    saveOrder: withUserCheck(async (sessionId, cartItems) => {
      await clearUserCart(get().userId);
      await saveOrderToFirestore(get().userId, sessionId, cartItems);
    }),

    failOrder: withUserCheck(async (sessionId, cartItems) => {
      await saveFailedOrderToFirestore(get().userId, sessionId, cartItems);
    }),
  };
});

export default useCartStore;