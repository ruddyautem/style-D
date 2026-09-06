import styled from "styled-components";
import { Link } from "react-router-dom";

export const CategoryPageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 60px;
`;

export const ShopPageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 60px;
`;

export const CategoryFilterBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 16px 20px;
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 12px 14px;
    gap: 6px;
  }
`;

export const FilterTab = styled(Link)`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  padding: 6px 14px;
  border: 1px solid ${({ $isActive }) => ($isActive ? "var(--border-dark)" : "var(--border-color)")};
  background-color: ${({ $isActive }) => ($isActive ? "var(--text-primary)" : "var(--bg-surface)")};
  color: ${({ $isActive }) => ($isActive ? "var(--bg-primary)" : "var(--text-primary)")};
  text-transform: uppercase;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);
  }

  @media (max-width: 768px) {
    font-size: 0.65rem;
    padding: 4px 10px;
  }
`;

export const CategoryContainer = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 32px 40px 0;
  box-sizing: border-box;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 24px 20px 0;
    gap: 18px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    padding: 16px 14px 0;
  }
`;