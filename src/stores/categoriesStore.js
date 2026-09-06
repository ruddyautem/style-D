import { create } from "zustand";
import { getCategoriesAndDocuments } from "../utils/firestoreInteractions";
import SHOP_DATA from "../shop-data";

const fallbackCategoriesMap = Object.fromEntries(
  SHOP_DATA.map((cat) => [cat.title.toLowerCase(), cat.items])
);

const useCategoriesStore = create((set) => ({
  categoriesMap: fallbackCategoriesMap,
  isLoading: false,
  error: null,
  fetchCategories: async () => {
    try {
      const categoryMap = await getCategoriesAndDocuments();
      if (categoryMap && Object.keys(categoryMap).length > 0) {
        set({ categoriesMap: categoryMap, isLoading: false, error: null });
      }
    } catch (error) {
      console.warn("Firestore categories fetch note, using local SHOP_DATA:", error.message);
      set({ categoriesMap: fallbackCategoriesMap, isLoading: false });
    }
  },
}));

export default useCategoriesStore;