import { useNavigate } from "react-router-dom";
import {
  DirectoryItemContainer,
  BackgroundImage,
  TopTag,
  Body,
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, subtitle, tag, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage $imageUrl={imageUrl} />
      {tag && <TopTag>[ {tag} ]</TopTag>}
      <Body>
        <div className="title-block">
          <h2>{title}</h2>
          {subtitle && <span className="sub">{subtitle}</span>}
        </div>
        <p>DÉCOUVRIR</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;