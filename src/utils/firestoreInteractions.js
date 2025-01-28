import {
  collection,
  doc,
  getDocs,
  setDoc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "../libs/firebase/firebase.utils";

// Helper to get the cart collection reference
export const getCartCollectionRef = (userId) =>
  collection(db, "users", userId, "cart");

// Helper to get a specific cart document reference
export const getCartDocRef = (userId, productId) =>
  doc(db, "users", userId, "cart", productId.toString());

// Fetch the user's cart from Firestore
export const fetchUserCart = async (userId) => {
  try {
    const cartSnapshot = await getDocs(getCartCollectionRef(userId));
    return cartSnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

// Save the entire cart to Firestore (add/update/delete products as needed)
export const saveCartToFirestore = async (userId, cartProducts) => {
  try {
    const batch = writeBatch(db); // Use a batch for atomic updates
    const cartCollectionRef = getCartCollectionRef(userId);

    // Fetch the current cart from Firestore
    const currentCartSnapshot = await getDocs(cartCollectionRef);
    const currentCartMap = new Map(currentCartSnapshot.docs.map((doc) => [doc.id, doc]));

    // Create a map of products in the updated cart for quick lookup
    const updatedCartMap = new Map(cartProducts.map((p) => [p.id.toString(), p]));

    // Iterate over the current cart and decide what to update/delete
    currentCartSnapshot.docs.forEach((doc) => {
      const productId = doc.id;
      if (!updatedCartMap.has(productId)) {
        // Product no longer exists in the updated cart, delete it
        batch.delete(doc.ref);
      }
    });

    // Add or update products in the updated cart
    cartProducts.forEach((product) => {
      const productRef = getCartDocRef(userId, product.id);
      if (currentCartMap.has(product.id.toString())) {
        // Product exists in Firestore, update it
        batch.update(productRef, { quantity: product.quantity });
      } else {
        // Product is new, add it
        batch.set(productRef, product);
      }
    });

    // Commit the batch
    await batch.commit();
  } catch (error) {
    console.error("Error saving cart:", error);
    throw error;
  }
};

// Clear the user's entire cart from Firestore
export const clearUserCart = async (userId) => {
  try {
    const cartSnapshot = await getDocs(getCartCollectionRef(userId));
    const batch = writeBatch(db); // Use a batch for atomic deletions
    cartSnapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

// Save an order to Firestore
export const saveOrderToFirestore = async (userId, sessionId, cartItems, paymentStatus) => {
  try {
    const orderId = sessionId.slice(6); // Remove the first 6 characters ("order_")
    console.log("Generated orderId:", orderId); // Debugging

    console.log("Saving order to Firestore with orderId:", orderId); // Debugging
    await setDoc(doc(db, "users", userId, "orders", orderId), {
      sessionId,
      items: cartItems,
      payment: { status: paymentStatus },
      createdAt: serverTimestamp(),
    });

    console.log("Order saved successfully with orderId:", orderId); // Debugging
    return orderId; // Return the sliced orderId
  } catch (error) {
    console.error(`Error saving ${paymentStatus} order:`, error);
    throw error;
  }
};