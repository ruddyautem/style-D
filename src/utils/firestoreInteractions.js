import {
  doc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../libs/firebase/firebase.utils.js";

// Helper to check if we are in development
const isDev = import.meta.env.DEV;

// Get all categories - Main function that's failing for you
export const getCategoriesAndDocuments = async () => {
  try {
    console.log("Fetching categories from Firestore...");
    const querySnapshot = await getDocs(collection(db, "categories"));

    const categoriesMap = Object.fromEntries(
      querySnapshot.docs.map((doc) => [
        doc.data().title.toLowerCase(),
        doc.data().items,
      ]),
    );

    console.log(
      "✅ Categories fetched successfully:",
      Object.keys(categoriesMap),
    );
    return categoriesMap;
  } catch (error) {
    console.error("❌ Error fetching categories:", error);

    // More detailed logging
    if (error.code === "unavailable" || error.message?.includes("offline")) {
      console.warn("Firestore appears to be offline or blocked by CORS.");
    }

    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
};

// Create user document
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {},
) => {
  if (!userAuth) return null;

  const userDocRef = doc(db, "users", userAuth.uid);

  try {
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      await setDoc(
        userDocRef,
        {
          displayName:
            userAuth.displayName || userAuth.email?.split("@")[0] || "User",
          email: userAuth.email,
          createdAt: serverTimestamp(),
          ...additionalInformation,
        },
        { merge: true },
      );
      console.log(`✅ New user document created for ${userAuth.uid}`);
      return userDocRef.id;
    } else {
      console.log(`User ${userAuth.uid} already exists in Firestore.`);
      return null;
    }
  } catch (error) {
    console.error("Error creating user document:", error);

    if (error.code === "unavailable" || error.message?.includes("offline")) {
      console.warn("Firestore offline - skipping user document creation");
      return null;
    }
    throw error;
  }
};

// Cart functions (kept mostly the same but with better logging)
export const getCartCollectionRef = (userId) =>
  collection(db, "users", userId, "cart");

export const getCartDocRef = (userId, productId) =>
  doc(db, "users", userId, "cart", productId.toString());

export const fetchUserCart = async (userId) => {
  try {
    const cartSnapshot = await getDocs(getCartCollectionRef(userId));
    return cartSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const saveCartToFirestore = async (userId, cartProducts) => {
  if (!userId || !cartProducts || !Array.isArray(cartProducts)) {
    console.warn("Invalid input for saveCartToFirestore");
    return null;
  }

  try {
    const batch = writeBatch(db);
    const currentCartSnapshot = await getDocs(getCartCollectionRef(userId));

    const currentCartMap = new Map(
      currentCartSnapshot.docs.map((d) => [d.id, { ...d.data(), id: d.id }]),
    );

    const updatedProductsMap = new Map(
      cartProducts.map((p) => [p.id.toString(), p]),
    );

    currentCartSnapshot.docs.forEach((d) => {
      if (!updatedProductsMap.has(d.id)) {
        batch.delete(d.ref);
      }
    });

    for (const [productId, product] of updatedProductsMap) {
      const productRef = getCartDocRef(userId, productId);
      if (currentCartMap.has(productId)) {
        batch.update(productRef, {
          ...product,
          quantity: product.quantity || 0,
        });
      } else {
        batch.set(productRef, {
          ...product,
          createdAt: serverTimestamp(),
          quantity: product.quantity || 1,
        });
      }
    }

    await batch.commit();
    return true;
  } catch (error) {
    console.error("Error saving cart:", error);
    throw error;
  }
};

export const clearUserCart = async (userId) => {
  try {
    const cartSnapshot = await getDocs(getCartCollectionRef(userId));
    const batch = writeBatch(db);
    cartSnapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

export const saveOrderToFirestore = async (
  userId,
  sessionId,
  cartItems,
  paymentStatus,
) => {
  try {
    const orderId = sessionId.slice(6);
    const totalPrice = cartItems.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 0),
      0,
    );

    await setDoc(doc(db, "users", userId, "orders", orderId), {
      sessionId,
      items: cartItems.map((item) => ({
        ...item,
        subTotal: item.price * item.quantity,
      })),
      total: totalPrice,
      payment: paymentStatus,
      createdAt: serverTimestamp(),
    });

    return orderId;
  } catch (error) {
    console.error(`Error saving order:`, error);
    throw error;
  }
};
