import styled from "styled-components";

export const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
  padding-right: 4px;

  @media (max-width: 380px) {
    padding-right: 2px;
  }

  input {
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border: 1.5px solid var(--border-color);
    background-color: var(--bg-primary);
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;
    display: grid;
    place-content: center;

    &:checked {
      background-color: var(--text-primary);
      border-color: var(--text-primary);

      &::after {
        content: "";
        width: 5px;
        height: 9px;
        border: solid var(--bg-primary);
        border-width: 0 2px 2px 0;
        transform: rotate(45deg) translate(-1px, -1px);
      }
    }

    &:hover {
      border-color: var(--text-primary);
    }
  }
`;

export const CheckoutProductContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border-color);
  box-sizing: border-box;
  min-width: 0;

  &:last-child {
    border-bottom: none;
  }

  .thumb-box {
    width: 76px;
    height: 98px;
    flex-shrink: 0;
    overflow: hidden;
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media (max-width: 480px) {
    gap: 12px;
    padding: 14px 0;
    .thumb-box {
      width: 64px;
      height: 82px;
    }
  }

  @media (max-width: 380px) {
    gap: 8px;
    padding: 12px 0;
    .thumb-box {
      width: 52px;
      height: 68px;
    }
  }
`;

export const ItemBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
    min-width: 0;

    .info {
      display: flex;
      flex-direction: column;
      gap: 3px;
      min-width: 0;
      flex: 1;

      .name {
        font-size: 0.84rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        color: var(--text-primary);
        line-height: 1.25;
        word-break: break-word;

        @media (max-width: 480px) {
          font-size: 0.74rem;
          line-height: 1.2;
          letter-spacing: 0.2px;
        }

        @media (max-width: 380px) {
          font-size: 0.68rem;
          line-height: 1.15;
          letter-spacing: 0;
        }
      }

      .unit-price {
        font-size: 0.74rem;
        color: var(--text-secondary);

        @media (max-width: 380px) {
          font-size: 0.7rem;
        }
      }
    }
  }

  .bottom-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-top: 10px;
    min-width: 0;

    .total-price {
      font-family: var(--font-sans);
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-primary);
      white-space: nowrap;

      @media (max-width: 380px) {
        font-size: 0.86rem;
      }
    }

    @media (max-width: 380px) {
      gap: 6px;
      margin-top: 8px;
    }
  }
`;

export const Stepper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  flex-shrink: 0;

  button {
    background: transparent;
    border: none;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text-primary);
    transition: background-color 0.2s ease;

    @media (max-width: 380px) {
      width: 22px;
      height: 24px;
      font-size: 0.8rem;
    }

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
    font-size: 0.76rem;
    font-weight: 700;
    color: var(--text-primary);
    padding: 2px 6px;
    cursor: pointer;
    outline: none;
    height: 28px;

    @media (max-width: 380px) {
      height: 24px;
      font-size: 0.7rem;
      padding: 1px 3px;
    }

    option {
      background-color: var(--bg-primary);
      color: var(--text-primary);
    }
  }
`;

export const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text-secondary);
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
  flex-shrink: 0;
  border-radius: 2px;

  &:hover {
    color: #b91c1c;
    background-color: rgba(185, 28, 28, 0.08);
    transform: scale(1.15);
  }

  svg {
    transition: transform 0.2s ease;
  }
`;
