// File: src/stores/UserStore.js

import { create } from "zustand";
import { onAuthStateChangedListener } from "../libs/firebase/firebase.utils";
import useCartStore from "./cartStore";

let unsubscribe;
const useUserStore = create((set, get) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),

  initializeListener: () => {
    unsubscribe = onAuthStateChangedListener((user) => {
      console.log('Auth state changed. User:', user); // Debug log
      if (user) {
        set({ currentUser: user });

        // Retrieve the user's cart from sessionStorage
        const cartData = JSON.parse(sessionStorage.getItem(`cart-${user.uid}`)) || [];
        console.log('Cart data from sessionStorage:', cartData); // Debug log
        useCartStore.getState().setUserId(user.uid);
        useCartStore.getState().setCartProducts(cartData);
      } else {
        // Clear cart and session storage on logout
        set({ currentUser: null });
        useCartStore.getState().resetCart();
        sessionStorage.removeItem(`cart-${get().userId}`);
      }
    });
  },

  cleanup: () => {
    if (unsubscribe) {
      unsubscribe();
    }
  },
}));

useUserStore.getState().initializeListener();

export default useUserStore;