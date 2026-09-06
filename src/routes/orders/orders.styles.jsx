import styled from "styled-components";

export const OrdersContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 24px auto 60px;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 16px;
    margin: 16px auto 10px;
  }
`;

export const OrdersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--border-dark);
  margin-bottom: 32px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const OrdersTitle = styled.h1`
  font-family: var(--font-serif);
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  font-weight: 800;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-primary);
  margin: 0;
`;

export const OrdersCount = styled.span`
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-secondary);
`;

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const OrderCard = styled.div`
  border: 1px solid var(--border-color);
  background-color: var(--bg-surface);
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--border-dark);
  }
`;

export const OrderCardHeader = styled.div`
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
  background-color: ${({ $isExpanded }) =>
    $isExpanded ? "var(--bg-primary)" : "var(--bg-surface)"};
  border-bottom: ${({ $isExpanded }) =>
    $isExpanded ? "1px solid var(--border-color)" : "none"};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--bg-primary);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 16px;
  }
`;

export const OrderHeaderMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .order-number-label {
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--text-secondary);
  }
`;

export const OrderNumberRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  .order-id-container {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
    padding: 3px 5px 3px 10px;
    transition: border-color 0.15s ease;

    &:hover {
      border-color: var(--border-dark);
    }

    .order-id {
      font-family: monospace;
      font-size: 0.88rem;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: var(--text-primary);
    }

    .copy-btn {
      background: transparent;
      border: none;
      color: var(--text-secondary);
      padding: 3px 5px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 2px;
      transition: all 0.15s ease;
      margin-left: auto;

      svg {
        width: 12px;
        height: 12px;
        display: block;
      }

      &:hover {
        background-color: var(--bg-surface);
        color: var(--text-primary);
      }

      &.copied {
        color: #15803d;
      }
    }
  }

  .order-badge {
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 3px 8px;
    background-color: #15803d;
    color: #ffffff;
  }
`;

export const OrderDate = styled.div`
  font-size: 0.78rem;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const OrderHeaderMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    border-top: 1px dashed var(--border-color);
    padding-top: 12px;
  }
`;

export const OrderTotal = styled.div`
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }

  .total-label {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--text-secondary);
    display: block;
    margin-bottom: 2px;
  }

  .total-amount {
    font-family: var(--font-sans);
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: 0.5px;
  }
`;

export const OrderToggleBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-primary);
  padding: 8px 14px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  transition: all 0.2s ease;

  svg {
    width: 12px;
    height: 12px;
    transition: transform 0.25s ease;
    transform: ${({ $isExpanded }) =>
      $isExpanded ? "rotate(180deg)" : "rotate(0deg)"};
  }

  ${OrderCard}:hover & {
    border-color: var(--border-dark);
  }
`;

export const OrderDetails = styled.div`
  padding: 24px;
  background-color: var(--bg-surface);
  animation: detailsFadeIn 0.2s ease-out;

  @keyframes detailsFadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const OrderItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const OrderItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 14px;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const OrderItemProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  img {
    width: 64px;
    height: 80px;
    object-fit: cover;
    border: 1px solid var(--border-color);
    background-color: #ebeae4;
    flex-shrink: 0;
  }

  .item-details {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .item-name {
      font-family: var(--font-sans);
      font-size: 0.88rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: var(--text-primary);
    }

    .item-unit-price {
      font-size: 0.78rem;
      color: var(--text-secondary);
    }
  }
`;

export const OrderItemMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
    border-top: 1px dashed var(--border-color);
    padding-top: 8px;
    margin-top: 4px;
  }

  .item-qty {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text-secondary);
    background-color: var(--bg-surface);
    padding: 4px 10px;
    border: 1px solid var(--border-color);
  }

  .item-subtotal {
    font-family: var(--font-sans);
    font-size: 0.95rem;
    font-weight: 800;
    color: var(--text-primary);
    min-width: 70px;
    text-align: right;
  }
`;

export const OrderSummaryFooter = styled.div`
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;

  .final-total {
    display: flex;
    align-items: baseline;
    gap: 10px;

    .label {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--text-secondary);
    }

    .value {
      font-family: var(--font-sans);
      font-size: 1.25rem;
      font-weight: 900;
      color: var(--text-primary);
    }
  }
`;

export const EmptyOrdersBox = styled.div`
  text-align: center;
  padding: 80px 20px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-surface);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  h2 {
    font-family: var(--font-serif);
    font-size: clamp(1.4rem, 2.5vw, 1.8rem);
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--text-primary);
    margin: 0;
  }

  p {
    font-size: 0.88rem;
    color: var(--text-secondary);
    max-width: 440px;
    line-height: 1.5;
    margin: 0;
  }
`;

export const LoadingContainer = styled.div`
  text-align: center;
  padding: 80px 20px;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-secondary);
`;
