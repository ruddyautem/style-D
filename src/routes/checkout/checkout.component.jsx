import { Link } from "react-router-dom";
import CheckoutProduct from "../../components/checkout-item/checkout-product.component";
import {
  CheckoutPageContainer,
  CheckoutTitle,
  CheckoutLayout,
  LeftSection,
  SectionBlock,
  BatchSelectionBar,
  VisualMetalCard,
  RightSummarySection,
  EmptyCartBox,
} from "./checkout.styles";
import useCartStore from "../../stores/cartStore";
import useUserStore from "../../stores/userStore";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { createCheckoutSession } from "../../actions/createCheckoutSession";

const Checkout = () => {
  const {
    cartProducts,
    cartTotal,
    cartCount,
    openDeleteConfirm,
    removeMultipleProductsFromCart,
  } = useCartStore();
  const { currentUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  // Clean up selected items that are no longer in cart
  useEffect(() => {
    const currentIds = new Set(cartProducts.map((p) => p.id));
    setSelectedItemIds((prev) => prev.filter((id) => currentIds.has(id)));
  }, [cartProducts]);

  const isAllSelected =
    cartProducts.length > 0 && selectedItemIds.length === cartProducts.length;
  const isIndeterminate =
    selectedItemIds.length > 0 && selectedItemIds.length < cartProducts.length;

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(cartProducts.map((p) => p.id));
    }
  };

  const handleToggleSelectOne = (productId) => {
    setSelectedItemIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleBatchDelete = () => {
    if (selectedItemIds.length === 0) return;
    const selectedProducts = cartProducts.filter((p) =>
      selectedItemIds.includes(p.id)
    );

    openDeleteConfirm(selectedProducts, "multiple");
  };

  const handleCheckout = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const session = await createCheckoutSession(cartProducts);
      if (session?.url) {
        window.location.href = session.url;
      } else {
        throw new Error("L'URL de paiement Stripe est introuvable.");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error(error.message || "Erreur lors de l'accès au paiement sécurisé.");
      setIsLoading(false);
    }
  };

  return (
    <CheckoutPageContainer>
      <CheckoutTitle>
        <span>RÈGLEMENT DE COMMANDE</span>
        <span className="count">[ {cartCount} ARTICLES ]</span>
      </CheckoutTitle>

      {cartProducts.length > 0 ? (
        <CheckoutLayout>
          {/* Left Column: Items and Details */}
          <LeftSection>
            {/* Step 1: Items List */}
            <SectionBlock>
              <div className="block-header">
                <span>[ 01 // SÉLECTION D'ARTICLES ]</span>
                <span className="badge">{cartCount} PIÈCES</span>
              </div>

              {/* Batch selection toolbar */}
              <BatchSelectionBar>
                <label className="left-controls">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    onChange={handleToggleSelectAll}
                  />
                  <span>
                    {selectedItemIds.length > 0
                      ? `${selectedItemIds.length} SÉLECTIONNÉ${selectedItemIds.length > 1 ? "S" : ""}`
                      : "TOUT SÉLECTIONNER"}
                  </span>
                </label>

                {selectedItemIds.length > 0 && (
                  <button
                    type="button"
                    className="delete-selected-btn"
                    onClick={handleBatchDelete}
                  >
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
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    SUPPRIMER ({selectedItemIds.length})
                  </button>
                )}
              </BatchSelectionBar>

              <div>
                {cartProducts.map((product) => (
                  <CheckoutProduct
                    key={product.id}
                    product={product}
                    isSelected={selectedItemIds.includes(product.id)}
                    onToggleSelect={handleToggleSelectOne}
                  />
                ))}
              </div>
            </SectionBlock>

            {/* Step 2: Shipping Method */}
            <SectionBlock>
              <div className="block-header">
                <span>[ 02 // EXPÉDITION EXPRESS ]</span>
                <span className="badge">OFFERT</span>
              </div>
              <div className="block-body">
                Livraison express sécurisée sous 48h ouvrées. Emballage d'atelier soigné avec numéro de suivi international fourni dès l'expédition.
              </div>
            </SectionBlock>

            {/* Step 3: Visual Test Card Simulation */}
            <SectionBlock>
              <div className="block-header">
                <span>[ 03 // CARTE BANCAIRE DE DÉMONSTRATION ]</span>
                <span className="badge">STRIPE TEST</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <VisualMetalCard>
                  <div className="chip-row">
                    <div className="chip" />
                    <span className="brand">STYLE — D // BLACK CARD</span>
                  </div>

                  <div className="card-num">4242 4242 4242 4242</div>

                  <div className="bottom-info">
                    <div>
                      <div style={{ fontSize: "0.55rem", opacity: 0.6, letterSpacing: "1px" }}>TITULAIRE</div>
                      <span style={{ fontWeight: 800 }}>UTILISATEUR TEST</span>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.55rem", opacity: 0.6, letterSpacing: "1px" }}>EXP / CVC</div>
                      <span>02/42 • 424</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.55rem", opacity: 0.6, letterSpacing: "1px" }}>STATUT</div>
                      <span style={{ color: "#e5c07b", fontWeight: 800 }}>TEST</span>
                    </div>
                  </div>
                </VisualMetalCard>

                <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", margin: 0 }}>
                  * En mode démonstration portfolio, vous pouvez utiliser ces identifiants de test sur le formulaire de paiement sécurisé Stripe.
                </p>
              </div>
            </SectionBlock>
          </LeftSection>

          {/* Right Column: Order Summary Card */}
          <RightSummarySection>
            <div className="summary-header">RÉCAPITULATIF</div>

            <div className="items-mini-list">
              {cartProducts.map((item) => (
                <div key={item.id} className="mini-item">
                  <span className="item-name">
                    {item.quantity}× {item.name}
                  </span>
                  <span className="item-price">{item.quantity * item.price} €</span>
                </div>
              ))}
            </div>

            <div className="calc-row">
              <span>Sous-total articles</span>
              <span>{cartTotal} €</span>
            </div>

            <div className="calc-row free">
              <span>Frais de livraison</span>
              <span>OFFERTS (48H)</span>
            </div>

            <div className="calc-row">
              <span>TVA et taxes locales</span>
              <span>Incluses</span>
            </div>

            <div className="total-row">
              <span className="label">TOTAL NET</span>
              <span className="value">{cartTotal} €</span>
            </div>

            <button
              className="pay-button"
              onClick={handleCheckout}
              disabled={isLoading}
              style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? "wait" : "pointer" }}
            >
              {isLoading ? "REDIRECTION VERS PAIEMENT..." : "PAIEMENT"}
            </button>
          </RightSummarySection>
        </CheckoutLayout>
      ) : (
        <EmptyCartBox>
          <h2>VOTRE PANIER EST ACTUELLEMENT VIDE</h2>
          <p>
            Vous n'avez pas encore sélectionné d'articles. Explorez nos collections Homme & Femme pour commencer vos achats.
          </p>
          <Link
            to="/shop"
            style={{
              marginTop: "16px",
              padding: "14px 28px",
              background: "var(--text-primary)",
              color: "var(--bg-primary)",
              fontWeight: "700",
              fontSize: "0.78rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            DÉCOUVRIR LA BOUTIQUE ↗
          </Link>
        </EmptyCartBox>
      )}
    </CheckoutPageContainer>
  );
};

export default Checkout;