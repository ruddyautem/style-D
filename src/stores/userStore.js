import { create } from 'zustand';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../libs/firebase/firebase.utils';

let unsubscribe;

const useUserStore = create((set, get) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),

  initializeListener: () => {
    unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      get().setCurrentUser(user);
    });
  },

  cleanup: () => {
    if (unsubscribe) {
      unsubscribe();
    }
  },
}));

// Automatically initialize the listener when the store is created
useUserStore.getState().initializeListener();

export default useUserStore;