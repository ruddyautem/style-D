import React, { useEffect, useState } from "react";
import { Container, Title, Message, OrderNumber } from "./Success.styles";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../stores/cartStore";
import Button from "../../components/button/button.component";

const Success = () => {
  const navigate = useNavigate();
  const { userId, cartProducts, saveOrder, resetLocalCart } = useCartStore();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const checkCart = async () => {
      if (orderId || !userId || cartProducts.length === 0) return;

      try {
        const sessionId = `order_${Date.now()}`;
        const orderId = await saveOrder(sessionId, cartProducts);
        if (orderId) {
          setOrderId(orderId);
          resetLocalCart();
        }
      } catch (error) {
        console.error("Error saving order:", error);
      }
    };

    const timer = setTimeout(checkCart, 2000); // Initial delay before checking
    return () => clearTimeout(timer); // Cleanup timeout on unmount or dependency change
  }, [userId, cartProducts, saveOrder, resetLocalCart, orderId]);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      if (!orderId) {
        navigate("/"); // Redirect to home if no orderId after 2 seconds
      }
    }, 5000);

    return () => clearTimeout(redirectTimer); // Cleanup the timer on unmount or when orderId changes
  }, [orderId, navigate]);

  if (!orderId)
    return (
      <Container>
        <Title>Vérification du Panier</Title>
      </Container>
    );

  return (
    <Container>
      <Title>Merci pour votre commande!</Title>
      <OrderNumber>
        Numéro de commande : <span>{orderId}</span>
      </OrderNumber>
      <Message>
       Elle est bien prise en compte et sera bientôt traitée.
      </Message>
      <Button buttonType='base' onClick={() => navigate("/")}>
        Retourner à l'accueil
      </Button>
    </Container>
  );
};

export default Success;
