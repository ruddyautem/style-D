import styled from "styled-components";

export const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 14px;
  padding: 12px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-surface);
  transition: border-color 0.2s ease;

  &:hover {
    border-color: var(--border-dark);
  }
`;

export const ImageContainer = styled.div`
  width: 75px;
  height: 95px;
  flex-shrink: 0;
  overflow: hidden;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;

    .name {
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-primary);
      line-height: 1.3;
    }
  }

  .bottom-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .price {
      font-family: var(--font-sans);
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--text-primary);
    }
  }
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  background-color: var(--bg-primary);

  button {
    background: transparent;
    border: none;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--text-primary);
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--border-color);
    }
  }

  .qty-select {
    background: transparent;
    border: none;
    border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    font-family: var(--font-sans);
    font-size: 0.74rem;
    font-weight: 700;
    color: var(--text-primary);
    padding: 2px 6px;
    cursor: pointer;
    outline: none;
    height: 26px;

    option {
      background-color: var(--bg-primary);
      color: var(--text-primary);
    }
  }
`;

export const RemoveBtn = styled.button`
  background: transparent;
  border: none;
  color: var(--text-secondary);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  border-radius: 2px;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    color: #b91c1c;
    background-color: rgba(185, 28, 28, 0.08);
    transform: scale(1.15);
  }

  svg {
    transition: transform 0.2s ease;
  }
`;
