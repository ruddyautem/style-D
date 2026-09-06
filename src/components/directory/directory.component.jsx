import DirectoryItem from "../directory-item/directory-item.component";
import {
  HomepageContainer,
  DirectoryGrid,
} from "./directory.styles.jsx";

const categories = [
  {
    id: 1,
    title: "Femme",
    tag: "SERIE 01",
    subtitle: "Prêt-à-porter féminin",
    imageUrl: "https://images.pexels.com/photos/3598015/pexels-photo-3598015.jpeg",
    route: "shop/femme",
  },
  {
    id: 2,
    title: "Homme",
    tag: "SERIE 02",
    subtitle: "Vestiaire masculin contemporain",
    imageUrl: "https://images.pexels.com/photos/30363231/pexels-photo-30363231/free-photo-of-fashionable-streetwear-group-in-san-isidro.jpeg",
    route: "shop/homme",
  },
  {
    id: 3,
    title: "Vestes",
    tag: "SERIE 03",
    subtitle: "Manteaux, cuirs & blousons",
    imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    route: "shop/vestes",
  },
  {
    id: 4,
    title: "Baskets",
    tag: "SERIE 04",
    subtitle: "Sneakers & souliers d'atelier",
    imageUrl: "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg",
    route: "shop/baskets",
  },
  {
    id: 5,
    title: "Chapeaux",
    tag: "SERIE 05",
    subtitle: "Casquettes, bonnets & bobs",
    imageUrl: "https://images.pexels.com/photos/1822845/pexels-photo-1822845.jpeg",
    route: "shop/chapeaux",
  },
];

const Directory = () => {
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