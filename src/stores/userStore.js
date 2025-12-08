import { create } from "zustand";
import { onAuthStateChangedListener } from "../libs/firebase/firebase.utils";
import useCartStore from "./cartStore";
import {
  createUserDocumentFromAuth,
  fetchUserCart,
} from "../utils/firestoreInteractions";

let unsubscribe;

const useUserStore = create((set) => ({
  currentUser: null,
  isInitializing: true,

  // More robust setCurrentUser method
  setCurrentUser: (user) => {
    set({
      currentUser: user,
      isInitializing: false,
    });
  },

  setIsInitializing: (value) => set({ isInitializing: value }),

  initializeListener: async () => {
    // Ensure only one listener is active
    if (!unsubscribe) {
      unsubscribe = onAuthStateChangedListener(async (user) => {
        try {
          if (user) {
            await handleUserLogin(user);
          } else {
            handleUserLogout();
          }
        } catch (error) {
          console.error("Authentication state change error:", error);
        }
      });
    }
  },

  cleanup: () => {
    // Prevent multiple unsubscriptions
    if (unsubscribe) {
      try {
        unsubscribe();
      } finally {
        set({ isInitializing: true });
      }
      
      unsubscribe = null;
    }
  },
}));


// Login handler
const handleUserLogin = async (user) => {
  const { setUserId, setCartProducts } = useCartStore.getState();

  console.log("User logged in:", user);

  try {
    await createUserDocumentFromAuth(user, {
      displayName: user.displayName || user.email || "",
    });

    const cartData = await fetchUserCart(user.uid);

    // Use set method
    useUserStore.getState().setCurrentUser({
      ...user,
      isFirstLogin: true,
      displayName: user.displayName,
    });

    setUserId(user.uid);

    if (cartData && cartData.length > 0) {
      setCartProducts(cartData);
    }
  } catch (error) {
    console.error("Error during user login handling:", error);
  }

  // Reset initializing flag after successful login
  useUserStore.getState().setIsInitializing(false);
};

// Logout handler
const handleUserLogout = () => {
  const { resetLocalCart } = useCartStore.getState();

  
  useUserStore.getState().setCurrentUser(null);
  resetLocalCart(); // Ne touche que le state local

  useUserStore.getState().setIsInitializing(true);
};

// Initialize listener and cleanup on component mount/unmount
useUserStore.getState().initializeListener();

export default useUserStore;
