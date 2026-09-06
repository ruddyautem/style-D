import React, { useEffect, useState, useRef } from "react";
import { Container, Title, Message, OrderNumberSection, OrderNumberContainer, ActionsContainer } from "./Success.styles";
import { useNavigate, useLocation } from "react-router-dom";
import useCartStore from "../../stores/cartStore";
import Button from "../../components/button/button.component";
import { fetchOrderFromFirestore } from "../../utils/firestoreInteractions";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, cartProducts, saveOrder, resetLocalCart } = useCartStore();
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  
  // Use a ref to prevent double-saving in StrictMode
  const hasSavedOrder = useRef(false);

  useEffect(() => {
    const processOrder = async () => {
      // Get session_id from URL
      const searchParams = new URLSearchParams(location.search);
      const sessionId = searchParams.get("session_id");

      if (!sessionId) {
        setError("No session ID found.");
        return;
      }

      if (!userId) {
        // Wait for auth to be ready
        return;
      }

      // Check if order was already saved previously (e.g. page refresh)
      try {
        const existingOrder = await fetchOrderFromFirestore(userId, sessionId);
        if (existingOrder) {
          setOrderId(existingOrder.orderNumber || existingOrder.id);
          return;
        }
      } catch (err) {
        console.warn("Could not check existing order:", err);
      }

      // If we already saved this order in a previous render, don't do it again
      if (hasSavedOrder.current) return;

      if (cartProducts.length === 0) {
        // Cart is empty and no existing order found in DB
        return;
      }

      hasSavedOrder.current = true;

      try {
        const savedOrderId = await saveOrder(sessionId, cartProducts);
        if (savedOrderId) {
          setOrderId(savedOrderId);
          resetLocalCart();
        }
      } catch (err) {
        console.error("Error saving order:", err);
        setError("Failed to save order.");
      }
    };

    processOrder();
  }, [userId, cartProducts, saveOrder, resetLocalCart, location.search]);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      if (!orderId && error) {
        navigate("/");
      }
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, [orderId, error, navigate]);

  if (error) {
    return (
      <Container>
        <Title>Erreur</Title>
        <Message>{error}</Message>
        <Button buttonType='base' onClick={() => navigate("/")}>
          Retourner à l'accueil
        </Button>
      </Container>
    );
  }

  if (!orderId)
    return (
      <Container>
        <Title>TRAITEMENT DE VOTRE PAIEMENT EN COURS...</Title>
      </Container>
    );

  const formattedOrderNumber = orderId.startsWith("#") ? orderId : `#${orderId}`;

  return (
    <Container>
      <Title>Merci pour votre commande!</Title>
      
      <OrderNumberSection>
        <span className="order-number-label">NUMÉRO DE COMMANDE</span>
        <OrderNumberContainer>
          <span className="number">{formattedOrderNumber}</span>
        </OrderNumberContainer>
      </OrderNumberSection>

      <Message>Elle est bien prise en compte et sera bientôt traitée.</Message>
      <ActionsContainer>
        <Button buttonType='base' onClick={() => navigate("/orders")}>
          Voir votre commande
        </Button>
        <Button buttonType='inverted' onClick={() => navigate("/")}>
          Retourner à l'accueil
        </Button>
      </ActionsContainer>
    </Container>
  );
};

export default Success;
