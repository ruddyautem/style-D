import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils"; // Make sure to import your Firestore instance
import SHOP_DATA from "../shop-data";

export const addShopData = async () => {
  const categoriesCollectionRef = collection(db, "categories");

  SHOP_DATA.forEach(async (category) => {
    const categoryDocRef = doc(categoriesCollectionRef, category.title.toLowerCase());
    await setDoc(categoryDocRef, { ...category });

    console.log(`Added ${category.title} category`);

    category.items.forEach(async (item) => {
      const itemDocRef = doc(
        collection(db, `${category.title.toLowerCase()}/items`)
      );
      await setDoc(itemDocRef, { ...item });

      console.log(`Added ${item.name} item`);
    });
  });

  console.log("All shop data added successfully");
};