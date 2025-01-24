import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      isCartOpen: false,
      cartProducts: [],
      cartCount: 0,
      cartTotal: 0,

      getCartProducts: () => get().cartProducts,

      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

      addProductToCart: (productToAdd) =>
        set(({ cartProducts, cartCount, cartTotal }) => {
          console.log('Adding product to cart:', productToAdd);
          const { id, name, imageUrl, price } = productToAdd;
          
          if (!id || !name || !imageUrl || !price) {
            console.error('Incomplete product data:', productToAdd);
            return { cartProducts, cartCount, cartTotal };
          }

          const existingProductIndex = cartProducts.findIndex(
            (product) => product.id === id
          );

          if (existingProductIndex !== -1) {
            return {
              cartProducts: cartProducts.map((product, index) =>
                index === existingProductIndex ? { ...product, quantity: product.quantity + 1 } : product
              ),
              cartCount: cartCount + 1,
              cartTotal: cartTotal + price,
            };
          }

          return {
            cartProducts: [
              ...cartProducts,
              {
                id,
                name,
                imageUrl,
                price,
                quantity: 1,
              },
            ],
            cartCount: cartCount + 1,
            cartTotal: cartTotal + price,
          };
        }),

      removeProductFromCart: (productIdToRemove) =>
        set(({ cartProducts, cartCount, cartTotal }) => {
          const productToRemove = cartProducts.find(
            (product) => product.id === productIdToRemove
          );
          return productToRemove.quantity > 1
            ? {
                cartProducts: cartProducts.map((product) =>
                  product.id === productIdToRemove
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
                ),
                cartCount: cartCount - 1,
                cartTotal: cartTotal - productToRemove.price,
              }
            : {
                cartProducts: cartProducts.filter(
                  (product) => product.id !== productIdToRemove
                ),
                cartCount: cartCount - 1,
                cartTotal: cartTotal - productToRemove.price,
              };
        }),

      clearProductFromCart: (productIdToClear) =>
        set(({ cartProducts, cartCount, cartTotal }) => {
          const productToClear = cartProducts.find(
            (product) => product.id === productIdToClear
          );
          return {
            cartProducts: cartProducts.filter(
              (product) => product.id !== productIdToClear
            ),
            cartCount: cartCount - productToClear.quantity,
            cartTotal:
              cartTotal - productToClear.price * productToClear.quantity,
          };
        }),
    }),
    { name: "cart-storage", getStorage: () => localStorage }
  )
);

export default useCartStore;