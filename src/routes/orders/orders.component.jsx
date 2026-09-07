import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useUserStore from "../../stores/userStore";
import { fetchUserOrders } from "../../utils/firestoreInteractions";
import Button from "../../components/button/button.component";

const CopyIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
import {
  OrdersContainer,
  OrdersHeader,
  OrdersTitle,
  OrdersCount,
  OrdersList,
  OrderCard,
  OrderCardHeader,
  OrderHeaderMain,
  OrderNumberRow,
  OrderDate,
  OrderHeaderMeta,
  OrderTotal,
  OrderToggleBtn,
  OrderDetails,
  OrderItemsList,
  OrderItemRow,
  OrderItemProduct,
  OrderItemMeta,
  OrderSummaryFooter,
  EmptyOrdersBox,
  LoadingContainer,
} from "./orders.styles";

const ChevronDownIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const Orders = () => {
  const navigate = useNavigate();
  const currentUser = useUserStore((state) => state.currentUser);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyOrder = async (orderNum) => {
    try {
      await navigator.clipboard.writeText(orderNum);
      setCopiedId(orderNum);
      toast.success("Numéro de commande copié !");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.warn("Could not copy order number:", err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadOrders = async () => {
      if (!currentUser?.uid) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userOrders = await fetchUserOrders(currentUser.uid);
        if (isMounted) {
          setOrders(userOrders);
          // By default expand the first order if available
          if (userOrders.length > 0) {
            setExpandedOrders({ [userOrders[0].id]: true });
          }
        }
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const formatDate = (createdAt) => {
    if (!createdAt) return "Date récente";
    let date;
    if (createdAt.toDate && typeof createdAt.toDate === "function") {
      date = createdAt.toDate();
    } else if (createdAt.seconds) {
      date = new Date(createdAt.seconds * 1000);
    } else if (typeof createdAt === "string" || typeof createdAt === "number") {
      date = new Date(createdAt);
    } else {
      return "Date récente";
    }

    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <OrdersContainer>
        <OrdersHeader>
          <OrdersTitle>VOS COMMANDES</OrdersTitle>
        </OrdersHeader>
        <LoadingContainer>CHARGEMENT DE VOS COMMANDES...</LoadingContainer>
      </OrdersContainer>
    );
  }

  return (
    <OrdersContainer>
      <OrdersHeader>
        <OrdersTitle>VOS COMMANDES</OrdersTitle>
        <OrdersCount>
          [ {orders.length} {orders.length === 1 ? "COMMANDE" : "COMMANDES"} ]
        </OrdersCount>
      </OrdersHeader>

      {orders.length === 0 ? (
        <EmptyOrdersBox>
          <h2>AUCUNE COMMANDE ENREGISTRÉE</h2>
          <p>
            Vous n'avez pas encore passé de commande sur le vestiaire STYLE — D.
            Découvrez nos pièces sélectionnées et créez votre silhouette.
          </p>
          <Button buttonType="base" onClick={() => navigate("/shop")}>
            DÉCOUVRIR LE VESTIAIRE
          </Button>
        </EmptyOrdersBox>
      ) : (
        <OrdersList>
          {orders.map((order) => {
            const isExpanded = !!expandedOrders[order.id];
            const itemCount =
              order.items?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;
            const displayOrderNumber = order.orderNumber || order.id;
            const formattedOrderNumber = displayOrderNumber.startsWith("#")
              ? displayOrderNumber
              : `#${displayOrderNumber}`;

            return (
              <OrderCard key={order.id}>
                <OrderCardHeader
                  $isExpanded={isExpanded}
                  onClick={() => toggleOrder(order.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleOrder(order.id);
                    }
                  }}
                >
                  <OrderHeaderMain>
                    <span className="order-number-label">NUMÉRO DE COMMANDE</span>
                    <OrderNumberRow>
                      <div
                        className={`order-id-container ${copiedId === formattedOrderNumber ? "copied" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyOrder(formattedOrderNumber);
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            handleCopyOrder(formattedOrderNumber);
                          }
                        }}
                        title="Cliquer pour copier le numéro de commande"
                        aria-label="Cliquer pour copier le numéro de commande"
                      >
                        <span className="order-id">{formattedOrderNumber}</span>
                        <button
                          type="button"
                          className={`copy-btn ${copiedId === formattedOrderNumber ? "copied" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyOrder(formattedOrderNumber);
                          }}
                          tabIndex={-1}
                          title="Copier le numéro de commande"
                          aria-label="Copier le numéro de commande"
                        >
                          {copiedId === formattedOrderNumber ? <CheckIcon /> : <CopyIcon />}
                        </button>
                      </div>
                      <span className="order-badge">
                        {order.payment === "success" ? "RÉGLÉE" : "CONFIRMÉE"}
                      </span>
                    </OrderNumberRow>
                    <OrderDate>
                      <CalendarIcon />
                      <span>{formatDate(order.createdAt)}</span>
                    </OrderDate>
                  </OrderHeaderMain>

                  <OrderHeaderMeta>
                    <OrderTotal>
                      <span className="total-label">
                        {itemCount} {itemCount > 1 ? "articles" : "article"} — TOTAL
                      </span>
                      <span className="total-amount">{order.total} €</span>
                    </OrderTotal>

                    <OrderToggleBtn $isExpanded={isExpanded}>
                      <span>{isExpanded ? "MASQUER" : "DÉTAILS"}</span>
                      <ChevronDownIcon />
                    </OrderToggleBtn>
                  </OrderHeaderMeta>
                </OrderCardHeader>

                {isExpanded && (
                  <OrderDetails>
                    <OrderItemsList>
                      {order.items &&
                        order.items.map((item, index) => {
                          const itemSubtotal =
                            item.subTotal ?? (item.price || 0) * (item.quantity || 1);

                          return (
                            <OrderItemRow key={item.id ? `${item.id}-${index}` : index}>
                              <OrderItemProduct>
                                {item.imageUrl ? (
                                  <img
                                    src={item.imageUrl}
                                    alt={item.name || "Article"}
                                    loading="lazy"
                                  />
                                ) : (
                                  <div
                                    style={{
                                      width: 64,
                                      height: 80,
                                      backgroundColor: "#ded9cd",
                                    }}
                                  />
                                )}
                                <div className="item-details">
                                  <span className="item-name">{item.name}</span>
                                  <span className="item-unit-price">
                                    Prix unitaire : {item.price} €
                                  </span>
                                </div>
                              </OrderItemProduct>

                              <OrderItemMeta>
                                <span className="item-qty">Qté : {item.quantity || 1}</span>
                                <span className="item-subtotal">{itemSubtotal} €</span>
                              </OrderItemMeta>
                            </OrderItemRow>
                          );
                        })}
                    </OrderItemsList>

                    <OrderSummaryFooter>
                      <div className="final-total">
                        <span className="label">MONTANT TOTAL RÉGLÉ :</span>
                        <span className="value">{order.total} €</span>
                      </div>
                    </OrderSummaryFooter>
                  </OrderDetails>
                )}
              </OrderCard>
            );
          })}
        </OrdersList>
      )}
    </OrdersContainer>
  );
};

export default Orders;
