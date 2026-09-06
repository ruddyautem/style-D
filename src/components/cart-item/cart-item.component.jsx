import { toast } from "sonner";
import useCartStore from "../../stores/cartStore";
import {
  CartItemContainer,
  ImageContainer,
  ItemDetails,
  QuantityControl,
  RemoveBtn,
} from "./cart-item.styles.jsx";

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const {
    handleProductQuantity,
    setProductQuantity,
    openDeleteConfirm,
  } = useCartStore();

  const handleIncrement = (e) => {
    e.stopPropagation();
    handleProductQuantity(cartItem, "add");
    toast.success(`Quantité mise à jour : ${quantity + 1} × ${name}`);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (quantity === 1) {
      openDeleteConfirm(cartItem, "remove");
    } else {
      handleProductQuantity(cartItem, "remove");
      toast.success(`Quantité mise à jour : ${quantity - 1} × ${name}`);
    }
  };

  const handleSelectQuantity = (e) => {
    e.stopPropagation();
    const val = parseInt(e.target.value, 10);
    setProductQuantity(cartItem, val);
    toast.success(`Quantité mise à jour : ${val} × ${name}`);
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
          alt={name}
        />
      </ImageContainer>

      <ItemDetails>
        <div className="top-row">
          <span className="name">{name}</span>
          <RemoveBtn onClick={handleRemove} title="Supprimer" aria-label="Supprimer">
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
            <button onClick={handleDecrement} title="Retirer 1">-</button>
            <select
              value={quantity}
              onChange={handleSelectQuantity}
              title="Choisir la quantité"
              className="qty-select"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((num) => (
                <option key={num} value={num}>
                  Qté: {num}
                </option>
              ))}
            </select>
            <button onClick={handleIncrement} title="Ajouter 1">+</button>
          </QuantityControl>

          <span className="price">{quantity * price} €</span>
        </div>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
