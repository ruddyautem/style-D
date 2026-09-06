import styled from "styled-components";
import { Link } from "react-router-dom";

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding-bottom: 64px;
  }
`;

export const NavigationContainer = styled.nav`
  height: 68px;
  width: 100%;
  max-width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 clamp(16px, 3vw, 40px);
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  box-sizing: border-box;

  &.checkout-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .right {
      display: flex !important;
      margin-left: auto;
      justify-self: flex-end;
    }

    .desktop-only-action {
      display: inline-flex !important;
    }

    button {
      display: inline-flex !important;
    }
  }

  @media (max-width: 1100px) {
    height: 62px;
  }

  @media (max-width: 900px) {
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 12px;
  }

  @media (max-width: 768px) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 56px;
    padding: 0 16px;

    &.checkout-nav {
      justify-content: space-between;
    }
  }
`;

export const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(6px, 1.2vw, 16px);
  justify-self: start;
  min-width: 0;

  &.center {
    grid-column: 2;
    justify-content: center;
    justify-self: center;
    gap: clamp(8px, 1.4vw, 18px);

    @media (max-width: 900px) {
      display: none;
    }
  }

  &.right {
    grid-column: 3;
    justify-content: flex-end;
    justify-self: end;
    margin-left: auto;
    flex-shrink: 0;

    @media (max-width: 768px) {
      display: none !important;
    }
  }

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

export const LogoContainer = styled(Link)`
  display: inline-flex;
  align-items: stretch;
  justify-content: flex-start;
  justify-self: start;
  text-decoration: none;
  background-color: var(--bg-surface);
  border: 1.5px solid var(--text-primary);
  box-sizing: border-box;
  height: clamp(32px, 2.2vw, 36px);
  overflow: hidden;
  transition: all 0.2s ease;
  flex-shrink: 0;

  .brand-text {
    display: inline-flex;
    align-items: center;
    padding: 0 clamp(10px, 1vw, 14px);
    font-family: var(--font-sans);
    font-size: clamp(0.78rem, 0.9vw, 0.88rem);
    font-weight: 900;
    letter-spacing: clamp(2px, 0.2vw, 2.8px);
    text-transform: uppercase;
    color: var(--text-primary);
    user-select: none;
    line-height: 1;
  }

  .brand-badge-d {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #dc2626;
    color: #ffffff;
    width: clamp(28px, 2.2vw, 33px);
    height: 100%;
    font-family: var(--font-sans);
    font-size: clamp(0.82rem, 0.95vw, 0.96rem);
    font-weight: 900;
    letter-spacing: 0.5px;
    line-height: 1;
    user-select: none;
    transition: transform 0.2s ease, background-color 0.2s ease;
  }

  &:hover {
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.14);
    border-color: var(--text-primary);

    .brand-badge-d {
      background-color: #b91c1c;
      transform: scale(1.04);
    }
  }

  @media (max-width: 768px) {
    height: 30px;
    border-width: 1px;
    margin: 0;

    .brand-text {
      padding: 0 8px 0 10px;
      font-size: 0.68rem;
      letter-spacing: 1.5px;
      font-weight: 800;
    }

    .brand-badge-d {
      width: 26px;
      font-size: 0.72rem;
    }
  }
`;

export const NavPillContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: clamp(8px, 1.4vw, 18px);
`;

export const SlidingPill = styled.div`
  position: absolute;
  top: ${({ $top = 0 }) => `${$top}px`};
  left: ${({ $left = 0 }) => `${$left}px`};
  width: ${({ $width = 0 }) => `${$width}px`};
  height: ${({ $height = 0 }) => `${$height}px`};
  background-color: var(--text-primary);
  border: 1px solid var(--border-dark);
  border-radius: 0;
  pointer-events: none;
  z-index: 1;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: all 0.28s cubic-bezier(0.25, 1, 0.5, 1);
`;

export const CategoryPillItem = styled(Link)`
  position: relative;
  z-index: 2;
  font-size: clamp(0.68rem, 0.8vw, 0.74rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: clamp(0.8px, 0.15vw, 1.5px);
  color: ${({ $isCurrentTarget }) => ($isCurrentTarget ? "var(--bg-primary)" : "var(--text-primary)")};
  padding: 5px clamp(6px, 0.8vw, 10px);
  border: 1px solid transparent;
  transition: color 0.22s ease;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
`;

export const NavItem = styled(Link)`
  font-size: clamp(0.68rem, 0.8vw, 0.74rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: clamp(0.8px, 0.15vw, 1.5px);
  color: ${({ $isActive }) => ($isActive ? "var(--bg-primary)" : "var(--text-primary)")};
  background-color: ${({ $isActive }) => ($isActive ? "var(--text-primary)" : "transparent")};
  padding: 5px clamp(6px, 0.8vw, 10px);
  border: 1px solid ${({ $isActive }) => ($isActive ? "var(--border-dark)" : "transparent")};
  transition: all 0.2s ease;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;

  &:hover {
    background-color: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);
  }

  @media (max-width: 1100px) {
    &.desktop-only {
      display: none;
    }
  }

  &.desktop-only-action {
    @media (max-width: 768px) {
      display: none !important;
    }
  }

  &.auth-nav-item {
    .mobile-auth {
      display: none;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.65rem;
    padding: 4px 6px;
    letter-spacing: 0.6px;

    &.auth-nav-item {
      padding: 0;
      width: 32px;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid transparent;
      border-radius: 2px;

      .desktop-auth {
        display: none;
      }

      .mobile-auth {
        display: inline-flex;
        align-items: center;
        justify-content: center;

        .user-icon {
          width: 21px;
          height: 21px;
          display: block;
        }
      }
    }
  }
`;

export const CartButton = styled.button`
  background: transparent;
  border: 1px solid ${({ $isActive }) => ($isActive ? "var(--border-dark)" : "transparent")};
  background-color: ${({ $isActive }) => ($isActive ? "var(--bg-surface)" : "transparent")};
  color: var(--text-primary);
  padding: 0;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  border-radius: 2px;
  box-sizing: border-box;

  &:hover {
    background-color: var(--bg-surface);
    border-color: var(--border-color);
  }

  .cart-svg-icon {
    width: 23px;
    height: 23px;
    color: var(--text-primary);
    display: block;
  }

  &.desktop-only-action {
    @media (max-width: 768px) {
      display: none !important;
    }
  }
`;

export const NavMenuButton = styled.button`
  background: transparent;
  border: 1px solid ${({ $isOpen }) => ($isOpen ? "var(--border-dark)" : "transparent")};
  background-color: ${({ $isOpen }) => ($isOpen ? "var(--bg-surface)" : "transparent")};
  color: var(--text-primary);
  padding: 0;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  border-radius: 2px;
  box-sizing: border-box;

  &:hover {
    background-color: var(--bg-surface);
    border-color: var(--border-color);
  }

  .hamburger-icon {
    width: 23px;
    height: 23px;
    display: block;
  }

  @media (max-width: 768px) {
    display: none !important;
  }
`;

export const SideMenuBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(22, 22, 22, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 999;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

export const SideMenuDrawer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 380px;
  max-width: 88vw;
  height: 100vh;
  background-color: var(--bg-primary);
  border-left: 1px solid var(--border-dark);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const SideMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-surface);

  h3 {
    font-family: var(--font-serif);
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 0;
    color: var(--text-primary);
  }

  button {
    background: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    font-family: var(--font-sans);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    padding: 6px 12px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--text-primary);
      color: var(--bg-primary);
      border-color: var(--text-primary);
    }
  }
`;

export const SideMenuBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .menu-section-label {
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-secondary);
    margin-bottom: 8px;
    padding-left: 4px;
  }
`;

export const SideMenuCategoryItem = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-surface);
  text-decoration: none;
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: all 0.2s ease;

  .item-title {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .item-tag {
    font-size: 0.62rem;
    color: var(--text-secondary);
    font-weight: 600;
  }

  .arrow-indicator {
    font-size: 0.8rem;
    color: var(--text-secondary);
    transition: transform 0.2s ease, color 0.2s ease;
  }

  &:hover {
    background-color: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);

    .item-tag,
    .arrow-indicator {
      color: var(--bg-primary);
    }

    .arrow-indicator {
      transform: translateX(3px);
    }
  }
`;

export const SideMenuFooter = styled.div`
  padding: 20px 24px;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-surface);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SideMenuLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  text-decoration: none;
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border: 1px solid var(--border-color);
  background-color: transparent;
  color: var(--text-primary);
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);
  }

  &.primary {
    background-color: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);

    &:hover {
      opacity: 0.88;
    }
  }
`;

export const AccountMenuContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const AccountIconButton = styled.button`
  background: transparent;
  border: 1px solid ${({ $isOpen }) => ($isOpen ? "var(--border-dark)" : "transparent")};
  background-color: ${({ $isOpen }) => ($isOpen ? "var(--bg-surface)" : "transparent")};
  color: var(--text-primary);
  padding: 0;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  border-radius: 2px;
  box-sizing: border-box;

  &:hover {
    background-color: var(--bg-surface);
    border-color: var(--border-color);
  }

  .user-icon {
    width: 23px;
    height: 23px;
    display: block;
  }

  &.desktop-only-action {
    @media (max-width: 768px) {
      display: none !important;
    }
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    padding: 0;

    .user-icon {
      width: 21px;
      height: 21px;
    }
  }
`;

export const UnifiedDrawerBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(22, 22, 22, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 999;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;

  @media (max-width: 768px) {
    bottom: 56px;
    height: calc(100vh - 56px);
    height: calc(100dvh - 56px);
  }
`;

export const UnifiedDrawerContainer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  max-width: 90vw;
  height: 100vh;
  background-color: var(--bg-primary);
  border-left: 1px solid var(--border-dark);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 768px) {
    bottom: 56px;
    height: calc(100vh - 56px);
    height: calc(100dvh - 56px);
    max-width: 92vw;
  }
`;

export const DrawerContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  animation: drawerContentFade 0.16s ease-out;

  @keyframes drawerContentFade {
    from {
      opacity: 0;
      transform: translateY(3px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const AccountBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(22, 22, 22, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 999;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

export const AccountDrawerContainer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 380px;
  max-width: 88vw;
  height: 100vh;
  background-color: var(--bg-primary);
  border-left: 1px solid var(--border-dark);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const AccountDrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-surface);

  h3 {
    font-family: var(--font-serif);
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 0;
    color: var(--text-primary);
  }

  button {
    background: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    font-family: var(--font-sans);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    padding: 6px 12px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--text-primary);
      color: var(--bg-primary);
      border-color: var(--text-primary);
    }
  }
`;

export const AccountDrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DrawerSectionLabel = styled.div`
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-secondary);
  padding-left: 2px;
  margin-top: 4px;
`;

export const AccountUserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  margin-bottom: 4px;

  .user-icon-box {
    width: 44px;
    height: 44px;
    background-color: var(--text-primary);
    color: var(--bg-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 0.58rem;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--text-secondary);

      .dot {
        width: 6px;
        height: 6px;
        background-color: #22c55e;
        border-radius: 50%;
      }
    }

    .user-name {
      font-family: var(--font-sans);
      font-size: 0.84rem;
      font-weight: 800;
      color: var(--text-primary);
      letter-spacing: 0.5px;
      text-transform: uppercase;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .user-email {
      font-size: 0.68rem;
      color: var(--text-secondary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

export const AccountGuestCard = styled.div`
  padding: 24px 18px;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4px;

  .guest-icon-box {
    width: 48px;
    height: 48px;
    border: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }

  h4 {
    font-family: var(--font-serif);
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin: 0 0 8px;
    color: var(--text-primary);
  }

  p {
    font-size: 0.72rem;
    line-height: 1.5;
    color: var(--text-secondary);
    margin: 0;
  }
`;

export const AccountPrimaryButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 16px;
  background-color: var(--text-primary);
  color: var(--bg-primary);
  border: 1px solid var(--text-primary);
  text-decoration: none;
  font-family: var(--font-sans);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const AccountDrawerItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 16px;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  text-decoration: none;
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  transition: all 0.2s ease;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;

  .item-content {
    display: flex;
    align-items: center;
    gap: 10px;

    .bullet {
      font-size: 0.6rem;
    }
  }

  .item-arrow {
    font-size: 0.82rem;
    color: var(--text-secondary);
    transition: transform 0.2s ease, color 0.2s ease;
  }

  .cart-count-pill {
    background-color: var(--text-primary);
    color: var(--bg-primary);
    font-size: 0.62rem;
    font-weight: 800;
    padding: 2px 7px;
  }

  &:hover {
    background-color: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);

    .item-arrow {
      color: var(--bg-primary);
      transform: translateX(3px);
    }

    .cart-count-pill {
      background-color: var(--bg-primary);
      color: var(--text-primary);
    }
  }
`;

export const AccountDrawerFooter = styled.div`
  padding: 20px 24px;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-surface);
`;

export const AccountLogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);
  }
`;

export const MobileBottomBar = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 56px;
    background-color: var(--bg-primary);
    border-top: 1px solid var(--border-color);
    padding: 0 12px;
    z-index: 1001;
    box-sizing: border-box;
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.06);
  }
`;

export const MobileBottomLeft = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const MobileBottomCenter = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  max-width: calc(100% - 170px);
  z-index: 2;

  @media (max-width: 360px) {
    max-width: calc(100% - 142px);
  }

  .promo-badge {
    height: 38px;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: clamp(4px, 1.2vw, 7px);
    background-color: var(--bg-surface);
    border: 1px solid var(--border-color);
    padding: 0 clamp(6px, 1.8vw, 12px);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    white-space: nowrap;
    line-height: 1;
  }

  .promo-sparkle {
    font-size: clamp(0.56rem, 1.8vw, 0.68rem);
    color: var(--text-primary);
    display: inline-block;
    line-height: 1;
    opacity: 0.9;
  }

  .promo-dot {
    width: 6px;
    height: 6px;
    min-width: 6px;
    border-radius: 50%;
    background-color: #10b981;
    display: inline-block;
    flex-shrink: 0;
  }

  .promo-truck {
    width: 14px;
    height: 14px;
    display: inline-block;
    color: var(--text-primary);
    flex-shrink: 0;

    @media (max-width: 350px) {
      display: none;
    }
  }

  .promo-text {
    font-family: var(--font-sans);
    font-size: clamp(0.58rem, 2.2vw, 0.70rem);
    font-weight: 800;
    letter-spacing: clamp(0.8px, 0.25vw, 1.3px);
    text-transform: uppercase;
    color: var(--text-primary);
    line-height: 1;
  }
`;

export const MobileBottomRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  flex-shrink: 0;
`;

export const MobileBottomCategoryButton = styled.button`
  background-color: ${({ $isActive }) => ($isActive ? "var(--text-primary)" : "var(--bg-surface)")};
  border: 1px solid ${({ $isActive }) => ($isActive ? "var(--text-primary)" : "var(--border-color)")};
  color: ${({ $isActive }) => ($isActive ? "var(--bg-primary)" : "var(--text-primary)")};
  height: 38px;
  width: 38px;
  min-width: 38px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  box-sizing: border-box;

  .hamburger-icon {
    width: 20px;
    height: 20px;
    display: block;
    color: currentColor;
    transition: transform 0.2s ease;
  }

  &:hover,
  &:active {
    background-color: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);

    .hamburger-icon {
      transform: scale(1.08);
    }
  }
`;

export const MobileBottomAccountIconButton = styled.button`
  background-color: ${({ $isActive }) => ($isActive ? "var(--text-primary)" : "var(--bg-surface)")};
  border: 1px solid ${({ $isActive }) => ($isActive ? "var(--text-primary)" : "var(--border-color)")};
  color: ${({ $isActive }) => ($isActive ? "var(--bg-primary)" : "var(--text-primary)")};
  height: 38px;
  width: 38px;
  min-width: 38px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  box-sizing: border-box;

  .user-icon {
    width: 20px;
    height: 20px;
    display: block;
    color: currentColor;
    transition: transform 0.2s ease;
  }

  &:hover,
  &:active {
    background-color: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);

    .user-icon {
      transform: scale(1.08);
    }
  }
`;

export const MobileBottomButton = MobileBottomAccountIconButton;

export const MobileBottomCartIconButton = styled.button`
  background-color: ${({ $isActive }) => ($isActive ? "var(--text-primary)" : "var(--bg-surface)")};
  border: 1px solid ${({ $isActive }) => ($isActive ? "var(--text-primary)" : "var(--border-color)")};
  color: ${({ $isActive }) => ($isActive ? "var(--bg-primary)" : "var(--text-primary)")};
  height: 38px;
  width: 38px;
  min-width: 38px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  box-sizing: border-box;

  .cart-svg-icon {
    width: 22px;
    height: 22px;
    display: block;
    color: currentColor;
    transition: transform 0.2s ease;
  }

  &:hover,
  &:active {
    background-color: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);

    .cart-svg-icon {
      transform: scale(1.08);
    }
  }
`;

export const FooterContainer = styled.footer`
  width: 100%;
  height: 40px;
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-secondary);
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 0.58rem;
    letter-spacing: 0.8px;
    height: 36px;
    padding: 0 8px;
    text-align: center;
    margin-bottom: 56px;
  }

  @media (max-width: 480px) {
    font-size: 0.5rem;
    letter-spacing: 0.4px;
  }
`;