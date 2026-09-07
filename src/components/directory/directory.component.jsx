import DirectoryItem from "../directory-item/directory-item.component";
import { useTranslation } from "../../stores/languageStore";
import {
  HomepageContainer,
  DirectoryGrid,
} from "./directory.styles.jsx";

const Directory = () => {
  const { t, currentLanguage } = useTranslation();
  const seriesWord = currentLanguage === "en" ? "SERIES" : "SÉRIE";

  const categories = [
    {
      id: 1,
      title: t("categories.womens"),
      tag: `${seriesWord} 01`,
      subtitle: t("home.womensSubtitle"),
      imageUrl: "https://images.pexels.com/photos/3598015/pexels-photo-3598015.jpeg",
      route: "shop/femme",
    },
    {
      id: 2,
      title: t("categories.mens"),
      tag: `${seriesWord} 02`,
      subtitle: t("home.mensSubtitle"),
      imageUrl: "https://images.pexels.com/photos/30363231/pexels-photo-30363231/free-photo-of-fashionable-streetwear-group-in-san-isidro.jpeg",
      route: "shop/homme",
    },
    {
      id: 3,
      title: t("categories.jackets"),
      tag: `${seriesWord} 03`,
      subtitle: t("home.jacketsSubtitle"),
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
      route: "shop/vestes",
    },
    {
      id: 4,
      title: t("categories.sneakers"),
      tag: `${seriesWord} 04`,
      subtitle: t("home.sneakersSubtitle"),
      imageUrl: "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg",
      route: "shop/baskets",
    },
    {
      id: 5,
      title: t("categories.hats"),
      tag: `${seriesWord} 05`,
      subtitle: t("home.hatsSubtitle"),
      imageUrl: "https://images.pexels.com/photos/1822845/pexels-photo-1822845.jpeg",
      route: "shop/chapeaux",
    },
  ];

  return (
    <HomepageContainer>
      <DirectoryGrid>
        {categories.map((category) => (
          <DirectoryItem key={category.id} category={category} />
        ))}
      </DirectoryGrid>
    </HomepageContainer>
  );
};

export default Directory;