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

export const Message = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
  line-height: 1.5;
  margin: 0 0 16px;
`;

export const OrderNumberSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  max-width: fit-content;
  margin: 12px auto 22px;
  text-align: center;

  .order-number-label {
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text-secondary);
  }
`;

export const OrderNumberContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 22px;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  text-align: center;

  .number {
    font-family: monospace;
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: 1px;
    color: #15803d;
  }
`;

export const OrderNumberBox = OrderNumberSection;
export const OrderNumber = OrderNumberSection;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 320px;
  margin-top: 16px;

  button {
    margin-top: 0;
    width: 100%;
  }
`;


