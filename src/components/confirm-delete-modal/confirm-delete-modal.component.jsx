import { useEffect } from "react";
import { toast } from "sonner";
import useCartStore from "../../stores/cartStore";
import StyleD from "../../assets/styled.svg?react";
import {
  ModalBackdrop,
  ModalCard,
  ModalHeader,
  ProductPreviewBox,
  Message,
  ModalActions,
  DeleteActionButton,
  KeepActionButton,
} from "./confirm-delete-modal.styles";

const ConfirmDeleteModal = () => {
  const {
    deleteConfirmItem,
    closeDeleteConfirm,
    handleProductQuantity,
    removeProductFromCart,
  } = useCartStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && deleteConfirmItem) {
        closeDeleteConfirm();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [deleteConfirmItem, closeDeleteConfirm]);

  if (!deleteConfirmItem) return null;

  const { product, products, action, onConfirm } = deleteConfirmItem;
  const isMultiple = !!products || Array.isArray(product);
  const itemsList = products || (Array.isArray(product) ? product : [product]);

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    } else if (isMultiple) {
      const ids = itemsList.map((p) => p.id);
      await useCartStore.getState().removeMultipleProductsFromCart(ids);
      const count = itemsList.length;
      toast.success(`${count} article${count > 1 ? "s" : ""} retiré${count > 1 ? "s" : ""} du panier.`);
    } else if (action === "remove") {
      handleProductQuantity(product, "remove");
      toast.success(`${product.name} retiré du panier.`);
    } else {
      removeProductFromCart(product);
      toast.success(`${product.name} retiré du panier.`);
    }
    closeDeleteConfirm();
  };

  return (
    <ModalBackdrop onClick={closeDeleteConfirm}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <div className="header-left">
            <span className="badge">[ SÉLECTION PANIER ]</span>
            <StyleD className="logo-icon" />
          </div>
          <button className="close-btn" onClick={closeDeleteConfirm} title="Fermer" aria-label="Fermer">
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
          </button>
        </ModalHeader>

        <h3 className="modal-title">
          {isMultiple
            ? `RETIRER LES ${itemsList.length} ARTICLES ?`
            : "RETIRER CET ARTICLE ?"}
        </h3>

        {!isMultiple && product && (
          <ProductPreviewBox>
            <div className="thumb-box">
              <img
                src={`https://wsrv.nl/?url=${encodeURIComponent(product.imageUrl)}&w=200&output=webp`}
                alt={product.name}
              />
            </div>
            <div className="item-meta">
              <span className="name">{product.name}</span>
              <span className="price">{product.price} €</span>
              {product.quantity > 1 && (
                <span className="qty-tag">Quantité sélectionnée : {product.quantity}</span>
              )}
            </div>
          </ProductPreviewBox>
        )}

        <Message>
          {isMultiple
            ? `Êtes-vous sûr de vouloir retirer les ${itemsList.length} articles sélectionnés de votre panier ?`
            : "Êtes-vous sûr de vouloir retirer cette pièce de votre panier ?"}
        </Message>

        <ModalActions>
          <DeleteActionButton onClick={handleConfirm}>
            [ RETIRER ]
          </DeleteActionButton>
          <KeepActionButton onClick={closeDeleteConfirm}>
            [ CONSERVER ]
          </KeepActionButton>
        </ModalActions>
      </ModalCard>
    </ModalBackdrop>
  );
};

export default ConfirmDeleteModal;
