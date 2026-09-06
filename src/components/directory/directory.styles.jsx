import styled from "styled-components";

export const HomepageContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (min-width: 900px) {
    height: calc(100vh - 115px);
    max-height: calc(100vh - 115px);
    padding: 14px 32px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  @media (max-width: 899px) {
    padding: 16px;
    height: auto;
    overflow: visible;
  }
`;

export const DirectoryGrid = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1.35fr 1fr;
  gap: 14px;

  /* Top row: 2 Primary Collections (Femme & Homme) */
  & > div:nth-child(1),
  & > div:nth-child(2) {
    grid-column: span 3;
    height: 100%;
    min-height: 0;
  }

  /* Bottom row: 3 Sub-Collections (Vestes, Baskets, Chapeaux) */
  & > div:nth-child(3),
  & > div:nth-child(4),
  & > div:nth-child(5) {
    grid-column: span 2;
    height: 100%;
    min-height: 0;
  }

  @media (max-width: 899px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: auto;

    & > div {
      width: 100% !important;
      height: 340px !important;
    }
  }
`;