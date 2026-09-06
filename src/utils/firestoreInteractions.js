import {
  doc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  serverTimestamp,
  getDoc,
  query,
  orderBy,
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
const getCartCollectionRef = (userId) =>
  collection(db, "users", userId, "cart");

const getCartDocRef = (userId, productId) =>
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

// Generates a simple sequence of digits (e.g. 21286759)
export const generateOrderNumber = (sessionId) => {
  if (!sessionId) {
    return String(Math.floor(10000000 + Math.random() * 90000000));
  }

  // Deterministic FNV-1a 32-bit hash from sessionId for idempotent generation
  let h = 0x811c9dc5;
  for (let i = 0; i < sessionId.length; i++) {
    h ^= sessionId.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  const num = 10000000 + (Math.abs(h) % 90000000);
  return String(num);
};

export const saveOrderToFirestore = async (
  userId,
  sessionId,
  cartItems,
  paymentStatus,
) => {
  try {
    const orderNumber = generateOrderNumber(sessionId);
    const totalPrice = cartItems.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 0),
      0,
    );

    await setDoc(doc(db, "users", userId, "orders", orderNumber), {
      orderNumber,
      sessionId,
      items: cartItems.map((item) => ({
        ...item,
        subTotal: item.price * item.quantity,
      })),
      total: totalPrice,
      payment: paymentStatus,
      createdAt: serverTimestamp(),
    });

    return orderNumber;
  } catch (error) {
    console.error(`Error saving order:`, error);
    throw error;
  }
};

export const fetchOrderFromFirestore = async (userId, sessionId) => {
  try {
    if (!userId || !sessionId) return null;
    const orderNumber = generateOrderNumber(sessionId);

    // 1. Try finding by orderNumber document ID
    const orderDoc = await getDoc(doc(db, "users", userId, "orders", orderNumber));
    if (orderDoc.exists()) {
      return { id: orderDoc.id, orderNumber, ...orderDoc.data() };
    }

    // 2. Try legacy doc ID (sessionId.slice(6))
    const legacyDoc = await getDoc(doc(db, "users", userId, "orders", sessionId.slice(6)));
    if (legacyDoc.exists()) {
      return { id: legacyDoc.id, orderNumber, ...legacyDoc.data() };
    }

    return null;
  } catch (error) {
    console.error("Error checking existing order:", error);
    return null;
  }
};

export const fetchUserOrders = async (userId) => {
  if (!userId) return [];
  try {
    const ordersRef = collection(db, "users", userId, "orders");
    let snapshot;
    try {
      const q = query(ordersRef, orderBy("createdAt", "desc"));
      snapshot = await getDocs(q);
    } catch (orderErr) {
      console.warn("Falling back to client-side sorting for orders:", orderErr);
      snapshot = await getDocs(ordersRef);
    }

    const orders = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      const orderNumber =
        data.orderNumber && /^\d{6,12}$/.test(data.orderNumber)
          ? data.orderNumber
          : generateOrderNumber(data.sessionId || docSnap.id);
      return {
        id: docSnap.id,
        orderNumber,
        ...data,
      };
    });

    return orders.sort((a, b) => {
      const timeA = a.createdAt?.toMillis
        ? a.createdAt.toMillis()
        : a.createdAt?.seconds
          ? a.createdAt.seconds * 1000
          : 0;
      const timeB = b.createdAt?.toMillis
        ? b.createdAt.toMillis()
        : b.createdAt?.seconds
          ? b.createdAt.seconds * 1000
          : 0;
      return timeB - timeA;
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
};

