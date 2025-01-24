// stores/categoriesStore.js
import { create } from "zustand";
import { getCategoriesAndDocuments } from "../libs/firebase/firebase.utils.js";

const useCategoriesStore = create((set) => ({
  categoriesMap: {},
  isLoading: true,
  error: null,
  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const categoryMap = await getCategoriesAndDocuments();
      set({ categoriesMap: categoryMap, isLoading: false });
    } catch (error) {
      console.error("Error fetching categories:", error);
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useCategoriesStore;