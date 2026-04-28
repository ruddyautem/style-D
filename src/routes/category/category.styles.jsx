import styled from "styled-components";

export const CategoryTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  text-align: center;
  margin: 40px 0;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 300;
`;

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px 20px;
  padding: 0 4vw 50px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;