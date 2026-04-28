import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavigationContainer = styled.nav`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4vw;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    height: 60px;
    padding: 0 15px;
  }
`;

export const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #000;
  font-weight: 800;
  font-size: 1.2rem; /* Slightly smaller base */
  letter-spacing: -0.5px;

  svg {
    width: 28px; /* Scaled down slightly */
    height: auto;
  }

  span {
    @media (max-width: 380px) {
      display: none; /* Hide text "STYLE", keep only SVG on tiny screens */
    }
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 0.8rem;
  }

  @media (max-width: 380px) {
    gap: 0.5rem;
  }
`;

export const NavLink = styled(Link)`
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #1a1a1a;
  white-space: nowrap; /* Prevents text from breaking into 2 lines */

  @media (max-width: 768px) {
    font-size: 0.75rem; /* Smaller text on mobile */
    letter-spacing: 0.5px;
  }

  @media (max-width: 380px) {
    font-size: 0.7rem;
    padding: 5px;
  }
`;