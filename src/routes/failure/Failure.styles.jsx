import styled from "styled-components";

export const Container = styled.div`
  min-height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;

  button {
    margin-top: 24px;
  }
`;

export const Title = styled.h1`
  font-family: var(--font-serif);
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-primary);
  margin-bottom: 16px;
`;
