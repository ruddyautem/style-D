import { toast } from "sonner";
import {
  CheckoutProductContainer,
  CheckboxContainer,
  ItemBody,
  Stepper,
  DeleteButton,
} from "./checkout-product.styles.jsx";
import useCartStore from "../../stores/cartStore";
import { useTranslation } from "../../stores/languageStore";

const CheckoutProduct = ({ product, isSelected, onToggleSelect }) => {
  const { t, currentLanguage, getProductName } = useTranslation();
  const displayName = getProductName(product);

  const {
    handleProductQuantity,
    setProductQuantity,
    openDeleteConfirm,
  } = useCartStore();

  const handleIncrement = () => {
    handleProductQuantity(product, "add");
    const msg = currentLanguage === "en" ? "Quantity updated" : "Quantité mise à jour";
    toast.success(`${msg} : ${product.quantity + 1} × ${displayName}`);
  };

  const handleDecrement = () => {
    if (product.quantity === 1) {
      openDeleteConfirm(product, "remove");
    } else {
      handleProductQuantity(product, "remove");
      const msg = currentLanguage === "en" ? "Quantity updated" : "Quantité mise à jour";
      toast.success(`${msg} : ${product.quantity - 1} × ${displayName}`);
    }
  };

  const handleSelectQuantity = (e) => {
    const val = parseInt(e.target.value, 10);
    setProductQuantity(product, val);
    const msg = currentLanguage === "en" ? "Quantity updated" : "Quantité mise à jour";
    toast.success(`${msg} : ${val} × ${displayName}`);
  };

  const handleRemove = () => {
    openDeleteConfirm(product, "clear");
  };

  return (
    <CheckoutProductContainer>
      {onToggleSelect && (
        <CheckboxContainer onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={!!isSelected}
            onChange={() => onToggleSelect(product.id)}
            aria-label={`${t("checkout.deleteItem")} ${displayName}`}
          />
        </CheckboxContainer>
      )}

      <div className="thumb-box">
        <img
          src={`https://wsrv.nl/?url=${encodeURIComponent(product.imageUrl)}&w=300&output=webp`}
          alt={displayName}
        />
      </div>

      <ItemBody>
        <div className="top-row">
          <div className="info">
            <span className="name">{displayName}</span>
            <span className="unit-price">{product.price} € {currentLanguage === "en" ? "/ unit" : "/ unité"}</span>
          </div>

          <DeleteButton
            onClick={handleRemove}
            title={t("checkout.deleteItem")}
            aria-label={t("checkout.deleteItem")}
          >
            <svg
              width="14"
              height="14"
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
          </DeleteButton>
        </div>

        <div className="bottom-row">
          <Stepper>
            <button onClick={handleDecrement} title={currentLanguage === "en" ? "Remove 1" : "Retirer 1"}>-</button>
            <select
              value={product.quantity}
              onChange={handleSelectQuantity}
              className="qty-select"
              title={currentLanguage === "en" ? "Select quantity" : "Choisir la quantité"}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((num) => (
                <option key={num} value={num}>
                  {t("cart.qty")}: {num}
                </option>
              ))}
            </select>
            <button onClick={handleIncrement} title={currentLanguage === "en" ? "Add 1" : "Ajouter 1"}>+</button>
          </Stepper>

          <span className="total-price">{product.quantity * product.price} €</span>
        </div>
      </ItemBody>
    </CheckoutProductContainer>
  );
};

export default CheckoutProduct;