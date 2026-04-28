import { Link } from "react-router-dom";
import styled from "styled-components";

export const CategoryPreviewContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr; /* Side title column */
  margin-bottom: 100px;
  padding: 0 4vw;
  gap: 40px;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  @media (max-width: 768px) {
    margin-bottom: 60px;
    padding: 0 20px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: sticky;
  top: 120px; /* Sticks title while you scroll the 4 products */
  height: fit-content;

  @media (max-width: 1024px) {
    position: static;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 1px solid #000;
    padding-bottom: 10px;
    width: 100%;
  }
`;

export const Title = styled(Link)`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  text-transform: uppercase;
  letter-spacing: 8px;
  font-weight: 200;
  color: #000;
  writing-mode: vertical-lr; /* Vertical text for high-end look */
  transform: rotate(180deg);
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    writing-mode: horizontal-tb;
    transform: none;
    letter-spacing: 4px;
    margin-bottom: 0;
  }
`;

export const ViewAllLink = styled(Link)`
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #000;
  position: relative;
  padding-left: 30px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 20px;
    height: 1px;
    background: black;
  }

  &:hover {
    opacity: 0.6;
  }
`;

export const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const IsLoading = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 200;
  letter-spacing: 5px;
  text-transform: uppercase;
`;