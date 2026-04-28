import styled from "styled-components";

export const DirectoryContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 350px;
  gap: 2px;
  background-color: #f0f0f0;

  /* DESKTOP: 5 items in a 4-column grid */
  & > div:nth-child(1) { grid-column: span 2; grid-row: span 2; } 
  & > div:nth-child(2) { grid-column: span 2; grid-row: span 1; }
  & > div:nth-child(3) { grid-column: span 1; grid-row: span 1; }
  & > div:nth-child(4) { grid-column: span 1; grid-row: span 1; }
  & > div:nth-child(5) { grid-column: span 2; grid-row: span 1; }

  /* TABLET: 2 columns */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 300px;
    
    /* We reset ALL children to span only 1 column/row by default */
    & > div { 
      grid-column: span 1 !important; 
      grid-row: span 1 !important; 
    }
    
    /* We only make the first one wide for visual balance */
    & > div:nth-child(1) { 
      grid-column: span 2 !important; 
    }
  }

  /* MOBILE: 1 column - This fixes the missing items */
  @media (max-width: 600px) {
    display: flex;             /* Switching to Flex is safer for a single column stack */
    flex-direction: column;
    background-color: transparent; /* Remove hairline look for cleaner mobile view */
    gap: 10px;                 /* Add a little breathing room between cards */
    
    & > div { 
      width: 100%;
      height: 400px;           /* Set a fixed height for the mobile cards */
      grid-column: auto !important; 
      grid-row: auto !important;
    }
  }
`;