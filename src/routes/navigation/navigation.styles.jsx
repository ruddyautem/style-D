import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
  display: flex;
  height: 100%;
  width: auto;
  gap: 5px;
  align-items: center;
  padding: 0 20px;

  svg {
    width: 40px; /* Adjust the logo size */
    height: auto;
  }

  span {
    white-space: nowrap; /* Prevents text from breaking into multiple lines */
    font-size: 1.2rem; /* Adjust font size if needed */
    font-weight: bold;
  }
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;
