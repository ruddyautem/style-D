import { Link } from "react-router-dom";
import styled from "styled-components";

export const CategoryPreviewContainer = styled.div`
  max-width: 1560px;
  margin: 0 auto 36px;
  padding: 0 32px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
    padding: 0 16px;
  }

  &:last-child {
    margin-bottom: 12px;

    @media (max-width: 768px) {
      margin-bottom: 6px;
    }
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-color);
`;

export const Title = styled(Link)`
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--text-primary);
  transition: color 0.2s ease;

  &:hover {
    color: var(--text-secondary);
  }

  @media (max-width: 768px) {
    font-size: 1.15rem;
    letter-spacing: 2px;
  }
`;

export const ViewAllLink = styled(Link)`
  font-family: var(--font-sans);
  font-size: 0.74rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.8px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-surface);
  transition: all 0.2s ease;

  &::after {
    content: "↗";
    font-size: 0.85rem;
    transition: transform 0.2s ease;
  }

  &:hover {
    background-color: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);

    &::after {
      transform: translate(2px, -2px);
    }
  }

  @media (max-width: 768px) {
    font-size: 0.68rem;
    padding: 4px 8px;
  }
`;

export const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  height: 380px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
    height: 340px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    height: auto;
  }
`;

export const IsLoading = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-sans);
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-secondary);
  font-size: 0.85rem;
`;