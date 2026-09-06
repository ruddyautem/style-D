import styled from "styled-components";

export const CheckoutPageContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 20px auto 40px;
  padding: 0 40px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 20px;
    margin: 16px auto 40px;
  }

  @media (max-width: 480px) {
    padding: 0 14px;
    margin: 14px auto 32px;
  }

  @media (max-width: 380px) {
    padding: 0 10px;
    margin: 10px auto 24px;
  }
`;

export const CheckoutTitle = styled.h1`
  font-family: var(--font-serif);
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  font-weight: 800;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--text-primary);
  margin: 0 0 18px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--border-dark);
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  .count {
    font-family: var(--font-sans);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 2px;
    color: var(--text-secondary);
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    letter-spacing: 2px;
    flex-wrap: wrap;
    gap: 6px;
  }

  @media (max-width: 380px) {
    font-size: 1.1rem;
    letter-spacing: 1.5px;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;

    .count {
      font-size: 0.74rem;
      letter-spacing: 1px;
    }
  }
`;

export const CheckoutLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  gap: 28px;
  align-items: flex-start;

  @media (max-width: 1024px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
`;

export const SectionBlock = styled.div`
  border: 1px solid var(--border-color);
  background-color: var(--bg-surface);
  padding: 18px 20px;
  box-sizing: border-box;
  min-width: 0;

  @media (max-width: 480px) {
    padding: 14px 12px;
  }

  @media (max-width: 380px) {
    padding: 12px 10px;
  }

  .block-header {
    font-family: var(--font-sans);
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-primary);
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 480px) {
      font-size: 0.74rem;
      letter-spacing: 1px;
      gap: 6px;
      flex-wrap: wrap;
    }

    @media (max-width: 380px) {
      font-size: 0.68rem;
      letter-spacing: 0.5px;
    }

    .badge {
      font-size: 0.68rem;
      background-color: var(--text-primary);
      color: var(--bg-primary);
      padding: 2px 8px;

      @media (max-width: 380px) {
        font-size: 0.62rem;
        padding: 2px 6px;
      }
    }
  }

  .block-body {
    font-size: 0.84rem;
    color: var(--text-secondary);
    line-height: 1.5;

    @media (max-width: 380px) {
      font-size: 0.78rem;
      line-height: 1.4;
    }
  }
`;

export const BatchSelectionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  margin-bottom: 12px;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  font-size: 0.78rem;
  box-sizing: border-box;
  min-width: 0;

  @media (max-width: 480px) {
    padding: 8px 10px;
    gap: 8px;
  }

  @media (max-width: 380px) {
    padding: 8px;
    gap: 6px;
  }

  .left-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--text-primary);
    min-width: 0;

    @media (max-width: 380px) {
      gap: 6px;
      font-size: 0.7rem;
      letter-spacing: 0.5px;
    }

    input[type="checkbox"] {
      appearance: none;
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      border: 1.5px solid var(--border-color);
      background-color: var(--bg-surface);
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

      &:indeterminate {
        background-color: var(--text-primary);
        border-color: var(--text-primary);

        &::after {
          content: "";
          width: 8px;
          height: 2px;
          background: var(--bg-primary);
        }
      }

      &:hover {
        border-color: var(--text-primary);
      }
    }
  }

  .delete-selected-btn {
    background: transparent;
    border: 1px solid #b3261e;
    color: #b3261e;
    font-family: var(--font-sans);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 6px 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;

    @media (max-width: 380px) {
      padding: 4px 6px;
      font-size: 0.62rem;
      letter-spacing: 0.5px;
      gap: 4px;
      white-space: nowrap;
    }

    &:hover {
      background-color: #b3261e;
      color: #ffffff;
    }
  }
`;

export const VisualMetalCard = styled.div`
  width: 100%;
  max-width: 400px;
  height: 220px;
  background: linear-gradient(135deg, #1c1c1c 0%, #111111 100%);
  border: 1px solid #333;
  color: #f6f5f0;
  padding: 24px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 480px) {
    height: 200px;
    padding: 16px;
  }

  &::after {
    content: "TEST CARD";
    position: absolute;
    top: 14px;
    right: 16px;
    background: #d4af37;
    color: #111;
    font-weight: 800;
    font-size: 0.54rem;
    letter-spacing: 1.2px;
    padding: 3px 8px;
    border-radius: 2px;
    transform: none;
    line-height: 1;
    text-transform: uppercase;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);

    @media (max-width: 480px) {
      top: 12px;
      right: 12px;
      font-size: 0.5rem;
      padding: 2.5px 6px;
    }
  }

  .chip-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;

    .chip {
      width: 40px;
      height: 30px;
      background: linear-gradient(135deg, #e5c07b 0%, #c69214 100%);
      border-radius: 4px;
      flex-shrink: 0;
    }

    .brand {
      font-family: var(--font-serif);
      font-size: 0.84rem;
      letter-spacing: 1.6px;
      font-weight: 700;
      white-space: nowrap;

      @media (max-width: 480px) {
        font-size: 0.64rem;
        letter-spacing: 0.8px;
      }
    }

    @media (max-width: 480px) {
      margin-top: 8px;

      .chip {
        width: 34px;
        height: 25px;
      }
    }
  }

  .card-num {
    font-family: 'Space Grotesk', monospace;
    font-size: 1.15rem;
    letter-spacing: 3px;
    font-weight: 700;
    color: #ffffff;

    @media (max-width: 480px) {
      font-size: 1rem;
      letter-spacing: 2px;
    }
  }

  .bottom-info {
    display: flex;
    justify-content: space-between;
    font-family: 'Space Grotesk', monospace;
    font-size: 0.76rem;
    letter-spacing: 1.5px;
    opacity: 0.85;

    @media (max-width: 480px) {
      font-size: 0.65rem;
      letter-spacing: 0.8px;
    }
  }
`;

export const RightSummarySection = styled.div`
  border: 1px solid var(--border-color);
  background-color: var(--bg-surface);
  padding: 28px;
  position: sticky;
  top: 100px;
  box-sizing: border-box;
  min-width: 0;

  @media (max-width: 480px) {
    padding: 18px 14px;
    position: static;
  }

  @media (max-width: 380px) {
    padding: 14px 10px;
  }

  .summary-header {
    font-family: var(--font-serif);
    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 20px;

    @media (max-width: 380px) {
      font-size: 1.1rem;
      letter-spacing: 1.5px;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }
  }

  .items-mini-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 280px;
    overflow-y: auto;
    margin-bottom: 20px;
    padding-right: 4px;

    .mini-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.78rem;
      gap: 8px;

      .item-name {
        font-weight: 600;
        text-transform: uppercase;
        color: var(--text-primary);
        max-width: 65%;
        word-break: break-word;
      }

      .item-price {
        font-weight: 700;
        color: var(--text-primary);
        white-space: nowrap;
      }
    }
  }

  .calc-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin-bottom: 10px;

    &.free {
      color: #15803d;
      font-weight: 700;
    }
  }

  .total-row {
    margin-top: 18px;
    padding-top: 16px;
    border-top: 2px solid var(--border-dark);
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    .label {
      font-family: var(--font-sans);
      font-size: 0.85rem;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;

      @media (max-width: 380px) {
        font-size: 0.78rem;
        letter-spacing: 1px;
      }
    }

    .value {
      font-family: var(--font-serif);
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--text-primary);

      @media (max-width: 380px) {
        font-size: 1.5rem;
      }
    }
  }

  .pay-button {
    width: 100%;
    height: 54px;
    margin-top: 24px;
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

    @media (max-width: 380px) {
      height: 48px;
      font-size: 0.72rem;
      letter-spacing: 1.5px;
    }

    &:hover {
      background-color: #262626;
      color: #ffffff;
    }
  }
`;

export const EmptyCartBox = styled.div`
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
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin: 0;
  }

  p {
    font-size: 0.85rem;
    color: var(--text-secondary);
    max-width: 320px;
  }
`;