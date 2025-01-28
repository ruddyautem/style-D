import { Container, Title } from "./Failure.styles";
import { useNavigate } from "react-router-dom";

import Button from "../../components/button/button.component";

const Success = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Une erreur s'est produite lors du paiement.</Title>
      <Button buttonType='base' onClick={() => navigate("/checkout")}>
        Payer votre commande
      </Button>
    </Container>
  );
};

export default Success;
