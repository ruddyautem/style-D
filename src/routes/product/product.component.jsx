import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import useCategoriesStore from "../../stores/categoriesStore";
import useCartStore from "../../stores/cartStore";
import useUserStore from "../../stores/userStore";
import { useTranslation } from "../../stores/languageStore";
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
  const { t, getProductName } = useTranslation();
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
  const productName = product ? getProductName(product) : "";

  const handleAdd = async () => {
    if (!currentUser) {
      toast.info(t("product.loginToast"));
      navigate("/auth");
      return;
    }

    if (!selectedSize) {
      toast.error(t("product.selectSizeToast"));
      return;
    }

    setIsAdded(true);

    // Add the item 'quantity' times (or pass quantity directly if your store supports it)
    const productWithSize = {
      id: `${product.id}-${selectedSize}`,
      name: `${productName} — ${selectedSize}`,
      imageUrl: product.imageUrl,
      price: product.price,
    };

    for (let i = 0; i < quantity; i++) {
      await handleProductQuantity(productWithSize, "add");
    }

    toast.success(`${productName} ${t("product.toastAdded")}`, {
      description: `${t("product.size")} ${selectedSize} · ${t("cart.qty")} ${quantity} · ${(product.price * quantity).toFixed(0)} €`,
    });

    setTimeout(() => setIsAdded(false), 1500);
  };

  if (isLoading) {
    return (
      <ProductPageWrapper>
        <NotFoundBox>{t("product.loading")}</NotFoundBox>
      </ProductPageWrapper>
    );
  }

  if (!product) {
    return (
      <ProductPageWrapper>
        <NotFoundBox>{t("product.notFound")}</NotFoundBox>
      </ProductPageWrapper>
    );
  }

  const categoryMap = {
    hats: "hats",
    chapeaux: "hats",
    jackets: "jackets",
    vestes: "jackets",
    sneakers: "sneakers",
    baskets: "sneakers",
    womens: "womens",
    femme: "womens",
    femmes: "womens",
    mens: "mens",
    homme: "mens",
    hommes: "mens",
  };
  const mappedCategoryKey = category ? categoryMap[category.toLowerCase()] || category.toLowerCase() : "";
  const translatedCategory = mappedCategoryKey ? t(`categories.${mappedCategoryKey}`) : "";
  const categoryLabel = translatedCategory && !translatedCategory.startsWith("categories.")
    ? translatedCategory
    : (category ? category.charAt(0).toUpperCase() + category.slice(1) : "Collection");

  return (
    <ProductPageWrapper>
      <Breadcrumb>
        <button onClick={() => navigate(`/shop/${category}`)}>
          {categoryLabel}
        </button>
        <span className='sep'>/</span>
        <span className='current'>{productName}</span>
      </Breadcrumb>

      <ProductLayout>
        {/* Left — Image */}
        <ProductImageBlock>
          <img
            src={`https://wsrv.nl/?url=${encodeURIComponent(product.imageUrl)}&w=900&output=webp`}
            alt={productName}
          />
        </ProductImageBlock>

        {/* Right — Info */}
        <ProductInfoBlock>
          <div>
            <ProductCategory>{categoryLabel}</ProductCategory>
            <ProductName>{productName}</ProductName>
          </div>

          <ProductPrice>
            {product.price}
            <span className='currency'>€</span>
          </ProductPrice>

          <Divider />

          {/* Size selector */}
          <div>
            <SectionLabel>
              {t("product.size")}{selectedSize ? ` — ${selectedSize}` : ""}
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
            <SectionLabel>{t("product.quantity")}</SectionLabel>
            <QuantityRow>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label={t("product.decreaseQty")}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                disabled={quantity >= 10}
                aria-label={t("product.increaseQty")}
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
              {isAdded ? t("product.addedToCart") : t("product.addToCart")}
            </AddToCartBtn>
          ) : (
            <AuthPromptBox>
              <p>
                {t("product.loginRequiredNotice")}
              </p>
              <button
                type='button'
                className='login-link'
                onClick={() => navigate("/auth")}
              >
                {t("product.loginLink")}
              </button>
            </AuthPromptBox>
          )}
        </ProductInfoBlock>
      </ProductLayout>
    </ProductPageWrapper>
  );
};

export default ProductPage;
