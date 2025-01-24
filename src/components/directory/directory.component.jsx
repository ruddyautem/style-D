import DirectoryItem from "../directory-item/directory-item.component";
import { DirectoryContainer } from "./directory.styles.jsx";

const categories = [
  {
    id: 1,
    title: "Chapeaux",
    imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
    route: "shop/chapeaux",
  },
  {
    id: 2,
    title: "vestes",
    imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    route: "shop/vestes",
  },
  {
    id: 3,
    title: "baskets",
    imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
    route: "shop/baskets",
  },
  {
    id: 4,
    title: "femme",
    imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
    route: "shop/femme",
  },
  {
    id: 5,
    title: "homme",
    imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
    route: "shop/homme",
  },
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
