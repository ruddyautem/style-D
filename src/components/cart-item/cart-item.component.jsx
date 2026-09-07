import { toast } from "sonner";
import useCartStore from "../../stores/cartStore";
import { useTranslation } from "../../stores/languageStore";
import {
  CartItemContainer,
  ImageContainer,
  ItemDetails,
  QuantityControl,
  RemoveBtn,
} from "./cart-item.styles.jsx";

const CartItem = ({ cartItem }) => {
  const { imageUrl, price, quantity } = cartItem;
  const { t, currentLanguage, getProductName } = useTranslation();
  const displayName = getProductName(cartItem);

  const {
    handleProductQuantity,
    setProductQuantity,
    openDeleteConfirm,
  } = useCartStore();

  const handleIncrement = (e) => {
    e.stopPropagation();
    handleProductQuantity(cartItem, "add");
    const msg = currentLanguage === "en" ? "Quantity updated" : "Quantité mise à jour";
    toast.success(`${msg} : ${quantity + 1} × ${displayName}`);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (quantity === 1) {
      openDeleteConfirm(cartItem, "remove");
    } else {
      handleProductQuantity(cartItem, "remove");
      const msg = currentLanguage === "en" ? "Quantity updated" : "Quantité mise à jour";
      toast.success(`${msg} : ${quantity - 1} × ${displayName}`);
    }
  };

  const handleSelectQuantity = (e) => {
    e.stopPropagation();
    const val = parseInt(e.target.value, 10);
    setProductQuantity(cartItem, val);
    const msg = currentLanguage === "en" ? "Quantity updated" : "Quantité mise à jour";
    toast.success(`${msg} : ${val} × ${displayName}`);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    openDeleteConfirm(cartItem, "clear");
  };

  return (
    <CartItemContainer>
      <ImageContainer>
        <img
          src={`https://wsrv.nl/?url=${encodeURIComponent(imageUrl)}&w=200&output=webp`}
          alt={displayName}
        />
      </ImageContainer>

      <ItemDetails>
        <div className="top-row">
          <span className="name">{displayName}</span>
          <RemoveBtn onClick={handleRemove} title={t("modal.close")} aria-label={t("modal.close")}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </RemoveBtn>
        </div>

        <div className="bottom-row">
          <QuantityControl>
            <button onClick={handleDecrement} title={currentLanguage === "en" ? "Remove 1" : "Retirer 1"}>-</button>
            <select
              value={quantity}
              onChange={handleSelectQuantity}
              title={currentLanguage === "en" ? "Select quantity" : "Choisir la quantité"}
              className="qty-select"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((num) => (
                <option key={num} value={num}>
                  {t("cart.qty")}: {num}
                </option>
              ))}
            </select>
            <button onClick={handleIncrement} title={currentLanguage === "en" ? "Add 1" : "Ajouter 1"}>+</button>
          </QuantityControl>

          <span className="price">{quantity * price} €</span>
        </div>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
