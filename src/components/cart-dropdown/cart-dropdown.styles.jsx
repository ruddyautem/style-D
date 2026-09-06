import styled from "styled-components";

export const CartBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(22, 22, 22, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 999;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

export const CartDrawerContainer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 440px;
  max-width: 92vw;
  height: 100vh;
  background-color: var(--bg-primary);
  border-left: 1px solid var(--border-dark);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-surface);

  h3 {
    font-family: var(--font-serif);
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 0;
    color: var(--text-primary);
  }

  button {
    background: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    font-family: var(--font-sans);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 6px 12px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--text-primary);
      color: var(--bg-primary);
      border-color: var(--text-primary);
    }
  }
`;

export const ShippingMeter = styled.div`
  padding: 10px 24px;
  background-color: var(--bg-surface);
  border-bottom: 1px solid var(--border-color);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--text-primary);
  display: flex;
  align-items: center;
`;

export const CartItemsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
  }
`;

export const EmptyState = styled.div`
  margin: auto;
  text-align: center;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  .title {
    font-family: var(--font-serif);
    font-size: 1.3rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--text-primary);
  }

  .desc {
    font-size: 0.76rem;
    color: var(--text-secondary);
    letter-spacing: 0.5px;
    max-width: 260px;
    line-height: 1.4;
  }
`;

export const DrawerFooter = styled.div`
  padding: 24px;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-surface);
  display: flex;
  flex-direction: column;
  gap: 14px;

  .subtotal-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    .label {
      font-size: 0.76rem;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--text-secondary);
    }

    .amount {
      font-family: var(--font-sans);
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--text-primary);
    }
  }

  .checkout-btn {
    width: 100%;
    height: 52px;
    background-color: var(--text-primary);
    color: var(--bg-primary);
    border: 1px solid var(--text-primary);
    font-family: var(--font-sans);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s ease;

    &:hover {
      background-color: #262626;
      color: #ffffff;
    }
  }

  .note {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    color: var(--text-secondary);
  }
`;
