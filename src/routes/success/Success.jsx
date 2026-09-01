import React, { useEffect, useState, useRef } from "react";
import { Container, Title, Message, OrderNumber } from "./Success.styles";
import { useNavigate, useLocation } from "react-router-dom";
import useCartStore from "../../stores/cartStore";
import Button from "../../components/button/button.component";

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

      // If we already saved this order in a previous render, don't do it again
      if (hasSavedOrder.current) return;

      if (!userId || cartProducts.length === 0) {
        // We might be waiting for auth to initialize or cart to fetch.
        // If they just navigated here manually with an empty cart, they won't get an order.
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

  return (
    <Container>
      <Title>Merci pour votre commande!</Title>
      <OrderNumber>
        Numéro de commande : <span>{orderId}</span>
      </OrderNumber>
      <Message>Elle est bien prise en compte et sera bientôt traitée.</Message>
      <Button buttonType='base' onClick={() => navigate("/")}>
        Retourner à l'accueil
      </Button>
    </Container>
  );
};

export default Success;
