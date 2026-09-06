import { toast } from "sonner";
import {
  CheckoutProductContainer,
  CheckboxContainer,
  ItemBody,
  Stepper,
  DeleteButton,
} from "./checkout-product.styles.jsx";
import useCartStore from "../../stores/cartStore";

const CheckoutProduct = ({ product, isSelected, onToggleSelect }) => {
  const {
    handleProductQuantity,
    setProductQuantity,
    openDeleteConfirm,
  } = useCartStore();

  const handleIncrement = () => {
    handleProductQuantity(product, "add");
    toast.success(`Quantité mise à jour : ${product.quantity + 1} × ${product.name}`);
  };

  const handleDecrement = () => {
    if (product.quantity === 1) {
      openDeleteConfirm(product, "remove");
    } else {
      handleProductQuantity(product, "remove");
      toast.success(`Quantité mise à jour : ${product.quantity - 1} × ${product.name}`);
    }
  };

  const handleSelectQuantity = (e) => {
    const val = parseInt(e.target.value, 10);
    setProductQuantity(product, val);
    toast.success(`Quantité mise à jour : ${val} × ${product.name}`);
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
            aria-label={`Sélectionner ${product.name}`}
          />
        </CheckboxContainer>
      )}

      <div className="thumb-box">
        <img
          src={`https://wsrv.nl/?url=${encodeURIComponent(product.imageUrl)}&w=300&output=webp`}
          alt={product.name}
        />
      </div>

      <ItemBody>
        <div className="top-row">
          <div className="info">
            <span className="name">{product.name}</span>
            <span className="unit-price">{product.price} € / unité</span>
          </div>

          <DeleteButton
            onClick={handleRemove}
            title="Supprimer l'article"
            aria-label="Supprimer l'article"
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
            <button onClick={handleDecrement} title="Retirer 1">-</button>
            <select
              value={product.quantity}
              onChange={handleSelectQuantity}
              className="qty-select"
              title="Choisir la quantité"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((num) => (
                <option key={num} value={num}>
                  Qté: {num}
                </option>
              ))}
            </select>
            <button onClick={handleIncrement} title="Ajouter 1">+</button>
          </Stepper>

          <span className="total-price">{product.quantity * product.price} €</span>
        </div>
      </ItemBody>
    </CheckoutProductContainer>
  );
};

export default CheckoutProduct;