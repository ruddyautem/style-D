import DirectoryItem from "../directory-item/directory-item.component";
import { DirectoryContainer } from "./directory.styles.jsx";

const categories = [
  { id: 1, title: "Femme", imageUrl: "https://images.pexels.com/photos/3598015/pexels-photo-3598015.jpeg", route: "shop/femme" },
  { id: 2, title: "Homme", imageUrl: "https://images.pexels.com/photos/30363231/pexels-photo-30363231/free-photo-of-fashionable-streetwear-group-in-san-isidro.jpeg", route: "shop/homme" },
  { id: 3, title: "Vestes", imageUrl: "https://i.ibb.co/px2tCc3/jackets.png", route: "shop/vestes" },
  { id: 4, title: "Baskets", imageUrl: "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg", route: "shop/baskets" },
  { id: 5, title: "Chapeaux", imageUrl: "https://images.pexels.com/photos/1822845/pexels-photo-1822845.jpeg", route: "shop/chapeaux" },
];

const Directory = () => {
  return (
    <DirectoryContainer>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </DirectoryContainer>
  );
};

export default Directory;