import { useState, useRef, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CartDrawerView } from "../../components/cart-dropdown/cart-dropdown.component";
import { signOutUser } from "../../libs/firebase/firebase.utils";
import useUserStore from "../../stores/userStore";
import useCartStore from "../../stores/cartStore";

import ShoppingBag from "../../assets/shopping-bag.svg?react";

import {
  LayoutContainer,
  MainContent,
  NavigationContainer,
  NavSection,
  LogoContainer,
  NavItem,
  CartButton,
  AccountIconButton,
  UnifiedDrawerBackdrop,
  UnifiedDrawerContainer,
  DrawerContentWrapper,
  AccountDrawerHeader,
  AccountDrawerBody,
  AccountUserCard,
  AccountGuestCard,
  AccountPrimaryButton,
  AccountDrawerItem,
  AccountDrawerFooter,
  AccountLogoutButton,
  DrawerSectionLabel,
  NavMenuButton,
  NavPillContainer,
  SlidingPill,
  CategoryPillItem,
  SideMenuHeader,
  SideMenuBody,
  SideMenuCategoryItem,
  SideMenuFooter,
  SideMenuLink,
  MobileBottomBar,
  MobileBottomLeft,
  MobileBottomCenter,
  MobileBottomRight,
  MobileBottomCategoryButton,
  MobileBottomButton,
  MobileBottomCartIconButton,
  FooterContainer,
} from "./navigation.styles";

const UserIcon = ({ className, size = 20, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LogoutIcon = ({ size = 14, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const PackageIcon = ({ size = 14, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

const HamburgerIcon = ({ size = 20, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const DeliveryTruckIcon = ({ size = 12, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
    <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);

const MobileCartIcon = ({ count }) => (
  <svg
    viewBox="0 -8.1 407.453 407.453"
    className="cart-svg-icon"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="currentColor" stroke="currentColor" strokeWidth="14" strokeLinejoin="round">
      {/* Top rim */}
      <path d="M255.099,116.515c4.487,0,8.129-3.633,8.129-8.129c0-4.495-3.642-8.129-8.129-8.129H143.486 c-4.487,0-8.129,3.633-8.129,8.129c0,4.495,3.642,8.129,8.129,8.129H255.099z" />
      {/* Bag body outline */}
      <path d="M367.062,100.258H311.69c-4.487,0-8.129,3.633-8.129,8.129c0,4.495,3.642,8.129,8.129,8.129h47.243 v274.681H48.519V116.515h44.536c4.487,0,8.129-3.633,8.129-8.129c0-4.495-3.642-8.129-8.129-8.129H40.391 c-4.487,0-8.129,3.633-8.129,8.129v290.938c0,4.495,3.642,8.129,8.129,8.129h326.671c4.487,0,8.129-3.633,8.129-8.129V108.386 C375.191,103.891,371.557,100.258,367.062,100.258z" />
      {/* Handle arch */}
      <path d="M282.59,134.796c4.487,0,8.129-3.633,8.129-8.129V67.394C290.718,30.238,250.604,0,201.101,0 c-49.308,0-89.414,30.238-89.414,67.394v59.274c0,4.495,3.642,8.129,8.129,8.129s8.129-3.633,8.129-8.129V67.394 c0-28.198,32.823-51.137,73.36-51.137c40.334,0,73.157,22.939,73.157,51.137v59.274 C274.461,131.163,278.095,134.796,282.59,134.796z" />
    </g>
    {/* Cleanly centered bold numeral */}
    <text
      x="203.7"
      y="248"
      textAnchor="middle"
      dominantBaseline="central"
      fill="currentColor"
      fontSize={count > 9 ? "185" : "215"}
      fontWeight="900"
      fontFamily="var(--font-sans)"
      letterSpacing="-1"
    >
      {count}
    </text>
  </svg>
);

const CATEGORIES_LIST = [
  { id: "homme", label: "HOMME", tag: "SÉRIE 01" },
  { id: "femme", label: "FEMME", tag: "SÉRIE 02" },
  { id: "vestes", label: "VESTES", tag: "SÉRIE 03" },
  { id: "baskets", label: "BASKETS", tag: "SÉRIE 04" },
  { id: "chapeaux", label: "CHAPEAUX", tag: "SÉRIE 05" },
];

const Navigation = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const { isCartOpen, setIsCartOpen, cartCount } = useCartStore();
  const [activeDrawer, setActiveDrawer] = useState(null); // 'menu' | 'account' | 'cart' | null
  const [lastActiveRightDrawer, setLastActiveRightDrawer] = useState("account");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (activeDrawer === "account" || activeDrawer === "cart") {
      setLastActiveRightDrawer(activeDrawer);
    }
  }, [activeDrawer]);

  const handleDrawerToggle = (drawerType) => {
    setActiveDrawer((prev) => (prev === drawerType ? null : drawerType));
  };

  const closeDrawer = () => {
    setActiveDrawer(null);
  };

  const [dragState, setDragState] = useState(null); // { side: 'left' | 'right', offset: number, progress: number, animating: boolean } | null

  const activeDrawerRef = useRef(activeDrawer);
  activeDrawerRef.current = activeDrawer;

  const lastActiveRightDrawerRef = useRef(lastActiveRightDrawer);
  lastActiveRightDrawerRef.current = lastActiveRightDrawer;

  const isSwipingRef = useRef(false);
  const touchInfoRef = useRef({
    startX: 0,
    startY: 0,
    startTime: 0,
    direction: null,
    initialDrawer: null,
    side: null,
    drawerWidth: 0,
    isDragging: false,
  });

  const handleCategoryClick = () => {
    if (isSwipingRef.current) return;
    handleDrawerToggle("menu");
  };

  const handleAccountClick = () => {
    if (isSwipingRef.current) return;
    handleDrawerToggle("account");
  };

  const handleCartClick = () => {
    if (isSwipingRef.current) return;
    handleDrawerToggle("cart");
  };

  const handleSignOut = async () => {
    closeDrawer();
    await signOutUser();
    toast.success("Déconnexion réussie. À bientôt !");
  };

  // Sync cart store isCartOpen with activeDrawer === 'cart'
  useEffect(() => {
    setIsCartOpen(activeDrawer === "cart");
  }, [activeDrawer, setIsCartOpen]);

  useEffect(() => {
    if (isCartOpen && activeDrawer !== "cart") {
      setActiveDrawer("cart");
    }
  }, [isCartOpen]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveDrawer(null);
      }
    };

    if (activeDrawer !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeDrawer]);

  // Lock body scroll when drawer is open or actively dragged
  useEffect(() => {
    if (activeDrawer !== null || (dragState && dragState.progress > 0.4)) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeDrawer, dragState?.progress]);

  // Real-time interactive tactile drawer swipe anywhere on screen (mobile <= 768px)
  useEffect(() => {
    const onTouchStart = (e) => {
      if (window.innerWidth > 768) return;
      if (!e.touches || e.touches.length !== 1) return;

      // Disable swipe when user is zoomed in — let them pan freely
      if (window.visualViewport && window.visualViewport.scale > 1) return;

      const target = e.target;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.closest?.("input, textarea, select, [data-no-swipe]"))
      ) {
        return;
      }

      const drawerWidth = Math.min(420, window.innerWidth * 0.92);
      const touch = e.touches[0];

      touchInfoRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        startTime: Date.now(),
        direction: null,
        initialDrawer: activeDrawerRef.current,
        side: null,
        drawerWidth,
        isDragging: false,
      };
    };

    const onTouchMove = (e) => {
      if (window.innerWidth > 768) return;
      if (!e.touches || e.touches.length !== 1) return;

      const info = touchInfoRef.current;
      if (!info.startTime) return;

      const touch = e.touches[0];
      const diffX = touch.clientX - info.startX;
      const diffY = touch.clientY - info.startY;

      // Disambiguate vertical page scrolling vs horizontal drawer swipe
      if (!info.direction) {
        if (Math.abs(diffY) > 8 && Math.abs(diffY) >= Math.abs(diffX)) {
          info.direction = "vertical";
          return;
        }
        if (Math.abs(diffX) > 8 && Math.abs(diffX) > Math.abs(diffY)) {
          info.direction = "horizontal";
        } else {
          return;
        }
      }

      if (info.direction === "vertical") return;

      // Horizontal gesture confirmed: lock gesture and prevent native page scroll
      if (e.cancelable) {
        e.preventDefault();
      }
      info.isDragging = true;
      isSwipingRef.current = true;

      const { initialDrawer, drawerWidth } = info;

      if (!initialDrawer) {
        // Both drawers closed:
        // Slide right -> reveals left drawer (menu / categories)
        // Slide left -> reveals right drawer (cart)
        if (diffX > 0) {
          info.side = "left";
          const clampedDiff = Math.min(drawerWidth, diffX);
          const offset = -drawerWidth + clampedDiff;
          const progress = Math.max(0, Math.min(1, clampedDiff / drawerWidth));
          setDragState({
            side: "left",
            offset,
            progress,
            animating: false,
          });
        } else if (diffX < 0) {
          info.side = "right";
          setLastActiveRightDrawer("cart");
          const clampedDiff = Math.min(drawerWidth, Math.abs(diffX));
          const offset = drawerWidth - clampedDiff;
          const progress = Math.max(0, Math.min(1, clampedDiff / drawerWidth));
          setDragState({
            side: "right",
            offset,
            progress,
            animating: false,
          });
        }
      } else if (initialDrawer === "menu") {
        // Left drawer is open:
        info.side = "left";
        if (diffX < 0) {
          // Dragging finger left pushes drawer back closed
          const clampedDiff = Math.min(drawerWidth, Math.abs(diffX));
          const offset = -clampedDiff;
          const progress = Math.max(0, Math.min(1, 1 - clampedDiff / drawerWidth));
          setDragState({
            side: "left",
            offset,
            progress,
            animating: false,
          });
        } else {
          // Elastic resistance to the right
          const offset = Math.min(25, diffX * 0.15);
          setDragState({
            side: "left",
            offset,
            progress: 1,
            animating: false,
          });
        }
      } else if (initialDrawer === "cart" || initialDrawer === "account") {
        // Right drawer is open:
        info.side = "right";
        if (diffX > 0) {
          // Dragging finger right pushes drawer back closed
          const clampedDiff = Math.min(drawerWidth, diffX);
          const offset = clampedDiff;
          const progress = Math.max(0, Math.min(1, 1 - clampedDiff / drawerWidth));
          setDragState({
            side: "right",
            offset,
            progress,
            animating: false,
          });
        } else {
          // Elastic resistance to the left
          const offset = -Math.min(25, Math.abs(diffX) * 0.15);
          setDragState({
            side: "right",
            offset,
            progress: 1,
            animating: false,
          });
        }
      }
    };

    const onTouchEnd = (e) => {
      if (window.innerWidth > 768) return;
      const info = touchInfoRef.current;
      if (!info.startTime || !info.isDragging) {
        touchInfoRef.current = { startTime: 0 };
        return;
      }

      const touch = e.changedTouches ? e.changedTouches[0] : null;
      const currentX = touch ? touch.clientX : info.startX;
      const diffX = currentX - info.startX;
      const duration = Math.max(1, Date.now() - info.startTime);
      const velocity = Math.abs(diffX) / duration; // px/ms
      const isFlick = velocity > 0.32 && Math.abs(diffX) > 25; // "coup sec"
      const { initialDrawer, drawerWidth, side } = info;

      let finalDrawer = initialDrawer;
      let targetOffset = 0;
      let targetProgress = 1;

      if (!initialDrawer) {
        if (side === "left") {
          const shouldOpen = isFlick && diffX > 0 ? true : diffX > drawerWidth * 0.28;
          if (shouldOpen) {
            finalDrawer = "menu";
            targetOffset = 0;
            targetProgress = 1;
          } else {
            finalDrawer = null;
            targetOffset = -drawerWidth;
            targetProgress = 0;
          }
        } else if (side === "right") {
          const shouldOpen = isFlick && diffX < 0 ? true : Math.abs(diffX) > drawerWidth * 0.28;
          if (shouldOpen) {
            finalDrawer = "cart";
            targetOffset = 0;
            targetProgress = 1;
          } else {
            finalDrawer = null;
            targetOffset = drawerWidth;
            targetProgress = 0;
          }
        }
      } else if (initialDrawer === "menu") {
        const shouldClose = isFlick && diffX < 0 ? true : diffX < -drawerWidth * 0.25;
        if (shouldClose) {
          finalDrawer = null;
          targetOffset = -drawerWidth;
          targetProgress = 0;
        } else {
          finalDrawer = "menu";
          targetOffset = 0;
          targetProgress = 1;
        }
      } else if (initialDrawer === "cart" || initialDrawer === "account") {
        const shouldClose = isFlick && diffX > 0 ? true : diffX > drawerWidth * 0.25;
        if (shouldClose) {
          finalDrawer = null;
          targetOffset = drawerWidth;
          targetProgress = 0;
        } else {
          finalDrawer = initialDrawer;
          targetOffset = 0;
          targetProgress = 1;
        }
      }

      // Smoothly animate towards final state
      setDragState({
        side: side || (finalDrawer === "menu" ? "left" : "right"),
        offset: targetOffset,
        progress: targetProgress,
        animating: true,
      });

      touchInfoRef.current = { startTime: 0 };

      setTimeout(() => {
        setActiveDrawer(finalDrawer);
        setDragState(null);
        setTimeout(() => {
          isSwipingRef.current = false;
        }, 120);
      }, 280);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  const backdropStyle = dragState
    ? {
        opacity: dragState.progress,
        visibility: dragState.progress > 0.01 ? "visible" : "hidden",
        transition: dragState.animating ? "opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.28s" : "none",
        pointerEvents: dragState.progress > 0.1 ? "auto" : "none",
      }
    : undefined;

  const leftDrawerStyle =
    dragState?.side === "left"
      ? {
          transform: `translateX(${dragState.offset}px)`,
          transition: dragState.animating ? "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
          pointerEvents: "auto",
          visibility: "visible",
        }
      : undefined;

  const rightDrawerStyle =
    dragState?.side === "right"
      ? {
          transform: `translateX(${dragState.offset}px)`,
          transition: dragState.animating ? "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
          pointerEvents: "auto",
          visibility: "visible",
        }
      : undefined;

  // Sliding pill navigation state
  const [hoveredCatId, setHoveredCatId] = useState(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, top: 0, width: 0, height: 0, visible: false });
  const navPillContainerRef = useRef(null);
  const itemRefs = useRef({});

  // Active category derived from location
  const activeCatId = CATEGORIES_LIST.find(
    (cat) => location.pathname === `/shop/${cat.id}`
  )?.id || null;

  // Compute position of target element inside NavPillContainer
  const updatePillPosition = (targetId) => {
    if (!targetId || !itemRefs.current[targetId] || !navPillContainerRef.current) {
      setPillStyle((prev) => ({ ...prev, visible: false }));
      return;
    }

    const containerRect = navPillContainerRef.current.getBoundingClientRect();
    const itemRect = itemRefs.current[targetId].getBoundingClientRect();

    setPillStyle({
      left: itemRect.left - containerRect.left,
      top: itemRect.top - containerRect.top,
      width: itemRect.width,
      height: itemRect.height,
      visible: true,
    });
  };

  // Target to highlight: hovered item takes priority, otherwise falls back to active category
  const currentPillTarget = hoveredCatId || activeCatId;

  useEffect(() => {
    updatePillPosition(currentPillTarget);
  }, [currentPillTarget, location.pathname]);

  // Handle window resize for accurate pill positioning
  useEffect(() => {
    const handleResize = () => {
      updatePillPosition(currentPillTarget);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentPillTarget]);

  // Close menus on route navigation
  useEffect(() => {
    setActiveDrawer(null);
    setHoveredCatId(null);
  }, [location.pathname]);

  const isCheckoutPage =
    location.pathname === "/checkout" || location.pathname.startsWith("/checkout");

  const isOrdersPage =
    location.pathname === "/orders" || location.pathname.startsWith("/orders");

  const hideTopCategories = isCheckoutPage || isOrdersPage;

  const currentYear = new Date().getFullYear();

  return (
    <LayoutContainer>
      <NavigationContainer className={hideTopCategories ? "checkout-nav" : ""}>
        {/* Zone 1: Brand Identity Mark with black STYLE container and red D badge (Gauche) */}
        <LogoContainer to='/' title="Accueil style-d" aria-label="Accueil style-d">
          <span className='brand-text'>STYLE</span>
          <span className='brand-badge-d'>D</span>
        </LogoContainer>

        {/* Zone 2: All categories displayed in top navigation bar with sliding pill (Hidden on payment & orders pages) */}
        {!hideTopCategories ? (
          <NavSection className='center'>
            <NavPillContainer
              ref={navPillContainerRef}
              onMouseLeave={() => setHoveredCatId(null)}
            >
              {/* Smooth animated sliding pill element */}
              <SlidingPill
                $left={pillStyle.left}
                $top={pillStyle.top}
                $width={pillStyle.width}
                $height={pillStyle.height}
                $visible={pillStyle.visible}
              />

              {CATEGORIES_LIST.map((cat) => {
                const isTarget = currentPillTarget === cat.id;
                return (
                  <CategoryPillItem
                    key={cat.id}
                    ref={(el) => (itemRefs.current[cat.id] = el)}
                    to={`/shop/${cat.id}`}
                    $isCurrentTarget={isTarget}
                    onMouseEnter={() => {
                      setHoveredCatId(cat.id);
                      if (location.pathname !== `/shop/${cat.id}`) {
                        navigate(`/shop/${cat.id}`);
                      }
                    }}
                  >
                    {cat.label}
                  </CategoryPillItem>
                );
              })}
            </NavPillContainer>
          </NavSection>
        ) : (
          <div style={{ gridColumn: 2 }} />
        )}

        {/* Zone 3: 3 buttons on the right: Menu (Hamburger), Compte, Panier */}
        <NavSection className='right'>
          {/* 1. Hamburger menu button (Always visible at top right) */}
          <NavMenuButton
            onClick={() => handleDrawerToggle("menu")}
            title="Menu des catégories"
            aria-label="Menu des catégories"
            $isOpen={activeDrawer === "menu"}
          >
            <HamburgerIcon className="hamburger-icon" />
          </NavMenuButton>

          {/* 2. Account button (Desktop only - user icon button) */}
          <AccountIconButton
            className="desktop-only-action"
            onClick={() => handleDrawerToggle("account")}
            title="Mon compte"
            aria-label="Mon compte"
            $isOpen={activeDrawer === "account"}
          >
            <UserIcon className="user-icon" />
          </AccountIconButton>

          {/* 3. Cart button (Desktop only - hidden on checkout page) */}
          {!isCheckoutPage && (
            <CartButton
              className="desktop-only-action"
              onClick={() => handleDrawerToggle("cart")}
              title="Panier"
              aria-label="Panier"
              $isActive={activeDrawer === "cart"}
            >
              <MobileCartIcon count={cartCount} />
            </CartButton>
          )}
        </NavSection>
      </NavigationContainer>

      {/* Slide-over Backdrop */}
      <UnifiedDrawerBackdrop
        $isOpen={activeDrawer !== null || (dragState && dragState.progress > 0.02)}
        style={backdropStyle}
        onClick={closeDrawer}
      />

      {/* Left Drawer Container: Categories Menu (Slides from the left on mobile) */}
      <UnifiedDrawerContainer
        $side="left"
        $isOpen={activeDrawer === "menu" || dragState?.side === "left"}
        style={leftDrawerStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <DrawerContentWrapper key="menu">
          <SideMenuHeader>
            <h3>CATÉGORIES</h3>
            <button onClick={closeDrawer}>[ FERMER ]</button>
          </SideMenuHeader>

          <SideMenuBody>
            <SideMenuCategoryItem to='/shop' onClick={closeDrawer}>
              <span className="item-title">TOUTE LA BOUTIQUE</span>
              <span className="arrow-indicator">→</span>
            </SideMenuCategoryItem>
            {CATEGORIES_LIST.map((cat) => (
              <SideMenuCategoryItem
                key={cat.id}
                to={`/shop/${cat.id}`}
                onClick={closeDrawer}
              >
                <span className="item-title">{cat.label}</span>
                <span className="item-tag">{cat.tag}</span>
              </SideMenuCategoryItem>
            ))}
          </SideMenuBody>

          <SideMenuFooter>
            {currentUser ? (
              <SideMenuLink to='/orders' onClick={closeDrawer}>
                <PackageIcon size={14} />
                <span>MES COMMANDES</span>
              </SideMenuLink>
            ) : (
              <SideMenuLink to='/auth' onClick={closeDrawer}>
                <UserIcon size={14} />
                <span>CONNEXION / CRÉER UN COMPTE</span>
              </SideMenuLink>
            )}
            <SideMenuLink
              to="/checkout"
              className="primary"
              onClick={closeDrawer}
            >
              <ShoppingBag style={{ width: 14, height: 14 }} />
              <span>OUVRIR LE PANIER ({cartCount})</span>
            </SideMenuLink>
          </SideMenuFooter>
        </DrawerContentWrapper>
      </UnifiedDrawerContainer>

      {/* Right Drawer Container: Account & Cart (Slides from the right) */}
      <UnifiedDrawerContainer
        $side="right"
        $isOpen={activeDrawer === "account" || activeDrawer === "cart" || dragState?.side === "right"}
        style={rightDrawerStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {(activeDrawer === "account" ||
          (activeDrawer === null && lastActiveRightDrawer === "account" && dragState?.side !== "right")) && (
          <DrawerContentWrapper key="account">
            <AccountDrawerHeader>
              <h3>MON COMPTE</h3>
              <button onClick={closeDrawer}>[ FERMER ]</button>
            </AccountDrawerHeader>

            <AccountDrawerBody>
              {currentUser ? (
                <>
                  <AccountUserCard>
                    <div className="user-icon-box">
                      <UserIcon size={22} />
                    </div>
                    <div className="user-info">
                      <div className="status-badge">
                        <span className="dot" />
                        <span>CONNECTÉ</span>
                      </div>
                      <span className="user-name">
                        {currentUser.displayName || currentUser.email?.split("@")[0] || "Client"}
                      </span>
                      <span className="user-email">{currentUser.email}</span>
                    </div>
                  </AccountUserCard>

                  <DrawerSectionLabel>NAVIGATION</DrawerSectionLabel>

                  <AccountDrawerItem to="/orders" onClick={closeDrawer}>
                    <div className="item-content">
                      <PackageIcon size={15} />
                      <span>MES COMMANDES</span>
                    </div>
                    <span className="item-arrow">→</span>
                  </AccountDrawerItem>

                  <AccountDrawerItem
                    to="/checkout"
                    onClick={closeDrawer}
                  >
                    <div className="item-content">
                      <ShoppingBag style={{ width: 15, height: 15 }} />
                      <span>VOIR LE PANIER</span>
                    </div>
                    <span className="cart-count-pill">{cartCount}</span>
                  </AccountDrawerItem>

                  <AccountDrawerItem to="/shop" onClick={closeDrawer}>
                    <div className="item-content">
                      <span className="bullet">■</span>
                      <span>TOUTE LA BOUTIQUE</span>
                    </div>
                    <span className="item-arrow">→</span>
                  </AccountDrawerItem>
                </>
              ) : (
                <>
                  <AccountGuestCard>
                    <div className="guest-icon-box">
                      <UserIcon size={26} />
                    </div>
                    <h4>ESPACE CLIENT</h4>
                    <p>
                      Connectez-vous pour suivre vos commandes, vos favoris et accéder rapidement à votre compte.
                    </p>
                  </AccountGuestCard>

                  <AccountPrimaryButton to="/auth" onClick={closeDrawer}>
                    <span>CONNEXION / S'INSCRIRE</span>
                    <span>→</span>
                  </AccountPrimaryButton>

                  <DrawerSectionLabel style={{ marginTop: 8 }}>ACCÈS RAPIDE</DrawerSectionLabel>

                  <AccountDrawerItem to="/orders" onClick={closeDrawer}>
                    <div className="item-content">
                      <PackageIcon size={15} />
                      <span>SUIVRE UNE COMMANDE</span>
                    </div>
                    <span className="item-arrow">→</span>
                  </AccountDrawerItem>

                  <AccountDrawerItem
                    to="/checkout"
                    onClick={closeDrawer}
                  >
                    <div className="item-content">
                      <ShoppingBag style={{ width: 15, height: 15 }} />
                      <span>VOIR LE PANIER</span>
                    </div>
                    <span className="cart-count-pill">{cartCount}</span>
                  </AccountDrawerItem>
                </>
              )}
            </AccountDrawerBody>

            {currentUser && (
              <AccountDrawerFooter>
                <AccountLogoutButton onClick={handleSignOut}>
                  <LogoutIcon size={15} />
                  <span>SE DÉCONNECTER</span>
                </AccountLogoutButton>
              </AccountDrawerFooter>
            )}
          </DrawerContentWrapper>
        )}

        {(activeDrawer === "cart" ||
          (activeDrawer === null && (lastActiveRightDrawer === "cart" || dragState?.side === "right"))) && (
          <DrawerContentWrapper key="cart">
            <CartDrawerView onClose={closeDrawer} />
          </DrawerContentWrapper>
        )}
      </UnifiedDrawerContainer>

      {/* Barre de navigation mobile en bas */}
      <MobileBottomBar>
        <MobileBottomLeft>
          {/* Bouton Hamburger Catégories */}
          <MobileBottomCategoryButton
            onClick={handleCategoryClick}
            $isActive={activeDrawer === "menu" || (dragState?.side === "left" && dragState.progress > 0.4)}
            title="Catégories"
            aria-label="Catégories"
          >
            <HamburgerIcon size={18} className="hamburger-icon" />
          </MobileBottomCategoryButton>
        </MobileBottomLeft>

        <MobileBottomRight>
          {/* Juste à côté le compte (juste l'icône, sans écriture ni point lumineux) */}
          <MobileBottomButton
            onClick={handleAccountClick}
            $isActive={activeDrawer === "account"}
            title="Mon compte"
            aria-label="Mon compte"
          >
            <UserIcon size={19} className="user-icon" />
          </MobileBottomButton>

          {/* En bas à droite le panier avec icône et nombre au milieu */}
          <MobileBottomCartIconButton
            onClick={handleCartClick}
            $isActive={activeDrawer === "cart" || (dragState?.side === "right" && dragState.progress > 0.4)}
            title="Panier"
            aria-label="Panier"
          >
            <MobileCartIcon count={cartCount} />
          </MobileBottomCartIconButton>
        </MobileBottomRight>
      </MobileBottomBar>

      <MainContent>
        <Outlet />
      </MainContent>

      <FooterContainer>
        © {currentYear} style-d.autem.dev — Tous droits réservés.
      </FooterContainer>
    </LayoutContainer>
  );
};

export default Navigation;