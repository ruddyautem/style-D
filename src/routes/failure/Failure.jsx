import { Container, Title } from "./Failure.styles";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../stores/languageStore";
import Button from "../../components/button/button.component";

const Failure = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container>
      <Title>{t("failure.title")}</Title>
      <Button buttonType='base' onClick={() => navigate("/checkout")}>
        {t("failure.retryBtn")}
      </Button>
    </Container>
  );
};

export default Failure;
