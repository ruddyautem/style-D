import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import useCategoriesStore from "../../stores/categoriesStore";
import useCartStore from "../../stores/cartStore";
import useUserStore from "../../stores/userStore";
import {
  ProductPageWrapper,
  Breadcrumb,
  ProductLayout,
  ProductImageBlock,
  ProductInfoBlock,
  ProductCategory,
  ProductName,
  ProductPrice,
  Divider,
  SectionLabel,
  SizeGrid,
  SizeButton,
  QuantityRow,
  AddToCartBtn,
  NotFoundBox,
  AuthPromptBox,
} from "./product.styles";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const ProductPage = () => {
  const { category, productId } = useParams();
  const navigate = useNavigate();
  const { categoriesMap, isLoading, fetchCategories } = useCategoriesStore();
  const { handleProductQuantity } = useCartStore();
  const { currentUser } = useUserStore();

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (Object.keys(categoriesMap).length === 0) {
      fetchCategories();
    }
  }, [fetchCategories, categoriesMap]);

  // Find the product
  const products = categoriesMap[category] || [];
  const product = products.find((p) => String(p.id) === String(productId));

  const handleAdd = async () => {
    if (!currentUser) {
      toast.info("Veuillez vous connecter pour enregistrer votre panier.");
      navigate("/auth");
      return;
    }

    if (!selectedSize) {
      toast.error("Veuillez sélectionner une taille.");
      return;
    }

    setIsAdded(true);

    // Add the item 'quantity' times (or pass quantity directly if your store supports it)
    const productWithSize = {
      id: `${product.id}-${selectedSize}`,
      name: `${product.name} — ${selectedSize}`,
      imageUrl: product.imageUrl,
      price: product.price,
    };

    for (let i = 0; i < quantity; i++) {
      await handleProductQuantity(productWithSize, "add");
    }

    toast.success(`${product.name} ajouté au panier`, {
      description: `Taille ${selectedSize} · Qté ${quantity} · ${(product.price * quantity).toFixed(0)} €`,
    });

    setTimeout(() => setIsAdded(false), 1500);
  };

  if (isLoading) {
    return (
      <ProductPageWrapper>
        <NotFoundBox>Chargement...</NotFoundBox>
      </ProductPageWrapper>
    );
  }

  if (!product) {
    return (
      <ProductPageWrapper>
        <NotFoundBox>Article introuvable.</NotFoundBox>
      </ProductPageWrapper>
    );
  }

  const categoryLabel = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "Collection";

  return (
    <ProductPageWrapper>
      <Breadcrumb>
        <button onClick={() => navigate(`/shop/${category}`)}>
          {categoryLabel}
        </button>
        <span className='sep'>/</span>
        <span className='current'>{product.name}</span>
      </Breadcrumb>

      <ProductLayout>
        {/* Left — Image */}
        <ProductImageBlock>
          <img
            src={`https://wsrv.nl/?url=${encodeURIComponent(product.imageUrl)}&w=900&output=webp`}
            alt={product.name}
          />
        </ProductImageBlock>

        {/* Right — Info */}
        <ProductInfoBlock>
          <div>
            <ProductCategory>{categoryLabel}</ProductCategory>
            <ProductName>{product.name}</ProductName>
          </div>

          <ProductPrice>
            {product.price}
            <span className='currency'>€</span>
          </ProductPrice>

          <Divider />

          {/* Size selector */}
          <div>
            <SectionLabel>
              Taille{selectedSize ? ` — ${selectedSize}` : ""}
            </SectionLabel>
            <SizeGrid>
              {SIZES.map((size) => (
                <SizeButton
                  key={size}
                  $selected={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </SizeButton>
              ))}
            </SizeGrid>
          </div>

          {/* Quantity */}
          <div>
            <SectionLabel>Quantité</SectionLabel>
            <QuantityRow>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label='Diminuer la quantité'
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                disabled={quantity >= 10}
                aria-label='Augmenter la quantité'
              >
                +
              </button>
            </QuantityRow>
          </div>

          <Divider />

          {/* Add to cart or Auth notice */}
          {currentUser ? (
            <AddToCartBtn
              onClick={handleAdd}
              disabled={isAdded}
              className={isAdded ? "added" : ""}
            >
              {isAdded ? "Ajouté au panier" : `Ajouter au panier`}
            </AddToCartBtn>
          ) : (
            <AuthPromptBox>
              <p>
                Vous devez <strong>être connecté(e)</strong> pour ajouter cet
                article au panier.
              </p>
              <button
                type='button'
                className='login-link'
                onClick={() => navigate("/auth")}
              >
                Se connecter
              </button>
            </AuthPromptBox>
          )}
        </ProductInfoBlock>
      </ProductLayout>
    </ProductPageWrapper>
  );
};

export default ProductPage;
