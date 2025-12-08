import {
  doc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../libs/firebase/firebase.utils";

// Existing functions remain unchanged

export const getCategoriesAndDocuments = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "categories"));

    return Object.fromEntries(
      querySnapshot.docs.map((doc) => [
        doc.data().title.toLowerCase(),
        doc.data().items,
      ])
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return null;

  const userDocRef = doc(db, "users", userAuth.uid);

  try {
    // First, check if document exists
    const userSnapshot = await getDoc(userDocRef);

    // If document doesn't exist, create it
    if (!userSnapshot.exists()) {
      await setDoc(
        userDocRef,
        {
          displayName: userAuth.displayName || userAuth.email,
          email: userAuth.email,
          createdAt: serverTimestamp(),
          ...additionalInformation,
        },
        { merge: true }
      );

      return userDocRef.id;
    }

    // If document exists, do nothing
    console.log(`User ${userAuth.uid} already exists in Firestore.`);
    return null;
  } catch (error) {
    console.error("Error creating the user:", error);
    throw new Error(`Failed to create user: ${error.message}`);
  }
};

export const getCartCollectionRef = (userId) =>
  collection(db, "users", userId, "cart");

export const getCartDocRef = (userId, productId) =>
  doc(db, "users", userId, "cart", productId.toString());

export const fetchUserCart = async (userId) => {
  try {
    const cartSnapshot = await getDocs(getCartCollectionRef(userId));
    return cartSnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const saveCartToFirestore = async (userId, cartProducts) => {
  // Validate inputs
  if (!userId || !cartProducts || !Array.isArray(cartProducts)) {
    console.warn("Invalid input parameters");
    return null;
  }

  try {
    const batch = writeBatch(db);

    // Fetch the current cart from Firestore and convert to a map for efficient lookup
    let currentCartMap = new Map();
    const currentCartSnapshot = await getDocs(getCartCollectionRef(userId));
    currentCartMap = currentCartSnapshot.docs.reduce((map, doc) => {
      map.set(doc.id, { ...doc.data(), id: doc.id });
      return map;
    }, new Map());

    // Create a map of updated cart products for easy lookup
    const updatedProductsMap = new Map(
      cartProducts.map((p) => [p.id.toString(), p])
    );

    // Delete items that are no longer in the updated cart
    currentCartSnapshot.docs.forEach((doc) => {
      if (!updatedProductsMap.has(doc.id)) {
        batch.delete(doc.ref);
      }
    });

    // Update quantities or add new products
    for (const [productId, product] of updatedProductsMap) {
      const productRef = getCartDocRef(userId, productId);

      if (currentCartMap.has(productId)) {
        // Update existing product quantity
        batch.update(productRef, {
          ...product,
          quantity: product.quantity || 0,
        });
      } else {
        // Add new product to the cart
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

    // Log more detailed error information
    if (error.code === "PERMISSION_DENIED") {
      console.warn("Permission denied. Check Firestore rules.");
    } else if (error.code === "NOT_FOUND") {
      console.warn("User cart not found. Creating a new cart.");
    }

    throw error;
  }
};

// Optimized batch update method
export const batchUpdate = async (batch, updates) => {
  Object.entries(updates).forEach(([path, data]) => {
    // Handle nested path updates
    if (typeof path === "string") {
      batch.update(doc(db, path), { ...data });
    } else {
      batch.update(path[0], { [path[1]]: data });
    }
  });
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
  paymentStatus
) => {
  try {
    const orderId = sessionId.slice(6);

    // Calculate total price
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    await setDoc(doc(db, "users", userId, "orders", orderId), {
      sessionId,
      items: cartItems.map((item) => ({
        ...item,
        // Include the calculated price for each item
        subTotal: item.price * item.quantity,
      })),
      total: totalPrice,
      payment: paymentStatus,
      createdAt: serverTimestamp(),
    });

    return orderId;
  } catch (error) {
    console.error(`Error saving ${paymentStatus} order:`, error);
    throw new Error(`Failed to save order: ${error.message}`);
  }
};

// export const addCollectionsAndDocuments = async (
//   collectionKey,
//   objectsToAdd
// ) => {
//   const collectionRef = collection(db, collectionKey);
//   const batch = writeBatch(db);

//   objectsToAdd.forEach((object) => {
//     const docRef = doc(collectionRef, object.title.toLowerCase());
//     batch.set(docRef, object);
//   });
//   await batch.commit();
// };
