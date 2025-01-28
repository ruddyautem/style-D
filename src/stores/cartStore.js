import { create } from "zustand";
import {
  fetchUserCart,
  saveCartToFirestore,
  clearUserCart,
  saveOrderToFirestore,
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
  if (!get().userId) return; // Ensure user is logged in
  return await fn(...args); // Return the result of the wrapped function
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

    // Open/close cart
    setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

    // Set user ID and fetch cart from Firestore
    setUserId: async (id) => {
      console.log("Setting userId:", id); // Debugging
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

    // Reset local cart state
    resetLocalCart: () => set({ cartProducts: [], cartCount: 0, cartTotal: 0 }),

    // Handle product quantity changes (add, remove, clear)
    handleProductQuantity,

    // Save order to Firestore and clear cart
    saveOrder: withUserCheck(async (sessionId, cartItems) => {
      console.log("Clearing user cart..."); // Debugging
      await clearUserCart(get().userId);
    
      console.log("Saving order to Firestore..."); // Debugging
      const orderId = await saveOrderToFirestore(get().userId, sessionId, cartItems, "success");
      console.log("Order ID after saving to Firestore:", orderId); // Debugging
    
      return orderId; // Ensure this returns the orderId
    }),

    // Set cart products directly (used by UserStore)
    setCartProducts: (products) => {
      updateCartState(products);
    },
  };
});

export default useCartStore;