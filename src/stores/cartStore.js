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

  // Function to set exact product quantity directly
  const setProductQuantity = async (product, newQuantity) => {
    const { cartProducts } = get();
    const qty = parseInt(newQuantity, 10);
    let updatedCart;

    if (isNaN(qty) || qty <= 0) {
      updatedCart = cartProducts.filter((p) => p.id !== product.id);
    } else {
      updatedCart = cartProducts.map((p) =>
        p.id === product.id ? { ...p, quantity: qty } : p
      );
    }

    updateCartState(updatedCart);
    await updateFirestoreCart(updatedCart);
  };

  const removeProductFromCart = async (product) => {
    await handleProductQuantity(product, "clear");
  };

  const removeMultipleProductsFromCart = async (productIds) => {
    const { cartProducts } = get();
    const idSet = new Set(productIds);
    const updatedCart = cartProducts.filter((p) => !idSet.has(p.id));
    updateCartState(updatedCart);
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

    // Custom Confirmation Modal state
    deleteConfirmItem: null,
    openDeleteConfirm: (product, action = "clear") => set({ deleteConfirmItem: { product, action } }),
    closeDeleteConfirm: () => set({ deleteConfirmItem: null }),

    // Set user ID and fetch cart from Firestore, merging any existing guest cart
    setUserId: async (id) => {
      console.log("Setting userId:", id);
      set({ userId: id });
      if (id) {
        try {
          const remoteCartItems = await fetchUserCart(id);
          const currentLocalCart = get().cartProducts;

          if (currentLocalCart && currentLocalCart.length > 0) {
            // Merge guest cart with remote cart
            const mergedMap = new Map();
            // 1. Add remote items
            remoteCartItems.forEach((item) => {
              mergedMap.set(item.id, { ...item });
            });
            // 2. Add or combine guest items
            currentLocalCart.forEach((localItem) => {
              if (mergedMap.has(localItem.id)) {
                const existing = mergedMap.get(localItem.id);
                mergedMap.set(localItem.id, {
                  ...existing,
                  quantity: existing.quantity + localItem.quantity,
                });
              } else {
                mergedMap.set(localItem.id, { ...localItem });
              }
            });

            const mergedCart = Array.from(mergedMap.values());
            updateCartState(mergedCart);
            await saveCartToFirestore(id, mergedCart);
          } else {
            updateCartState(remoteCartItems);
          }
        } catch (error) {
          console.error("Error syncing cart on login:", error);
          set({ cartError: "Erreur de chargement du panier" });
        }
      }
    },

    // Reset local cart state
    resetLocalCart: () => set({ cartProducts: [], cartCount: 0, cartTotal: 0 }),

    // Handle product quantity changes (add, remove, clear)
    handleProductQuantity,
    setProductQuantity,
    removeProductFromCart,
    removeMultipleProductsFromCart,

    // Save order to Firestore and clear cart
    saveOrder: withUserCheck(async (sessionId, cartItems) => {
      console.log("Saving order to Firestore..."); // Debugging
      const orderId = await saveOrderToFirestore(get().userId, sessionId, cartItems, "success");
      console.log("Order ID after saving to Firestore:", orderId); // Debugging

      console.log("Clearing user cart..."); // Debugging
      await clearUserCart(get().userId);
    
      return orderId; // Ensure this returns the orderId
    }),

    // Set cart products directly (used by UserStore)
    setCartProducts: (products) => {
      updateCartState(products);
    },
  };
});

export default useCartStore;