import styled from "styled-components";

export const ProductPageWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 24px auto 60px;
  padding: 0 40px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 20px;
    margin: 16px auto 40px;
  }

  @media (max-width: 480px) {
    padding: 0 14px;
  }
`;

export const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 28px;

  a,
  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: var(--text-secondary);
    font-size: inherit;
    font-weight: inherit;
    letter-spacing: inherit;
    text-transform: inherit;
    font-family: inherit;
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      color: var(--text-primary);
    }
  }

  span.sep {
    opacity: 0.4;
  }

  span.current {
    color: var(--text-primary);
  }

  @media (max-width: 480px) {
    font-size: 0.65rem;
    margin-bottom: 20px;
  }
`;

export const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;

  @media (max-width: 900px) {
    gap: 36px;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

export const ProductImageBlock = styled.div`
  position: sticky;
  top: 100px;

  @media (max-width: 700px) {
    position: static;
  }

  img {
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    display: block;
    border: 1px solid var(--border-color);
    background-color: #ebeae4;
  }
`;

export const ProductInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const ProductCategory = styled.span`
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--text-secondary);
`;

export const ProductName = styled.h1`
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.15;
`;

export const ProductPrice = styled.div`
  font-family: var(--font-sans);
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--text-primary);
  letter-spacing: 1px;

  span.currency {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-secondary);
    margin-left: 2px;
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--border-color);
  margin: 0;
`;

export const SectionLabel = styled.div`
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 10px;
`;

export const SizeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const SizeButton = styled.button`
  min-width: 52px;
  padding: 10px 14px;
  border: 1.5px solid
    ${({ $selected }) =>
      $selected ? "var(--border-dark)" : "var(--border-color)"};
  background-color: ${({ $selected }) =>
    $selected ? "var(--text-primary)" : "var(--bg-surface)"};
  color: ${({ $selected }) =>
    $selected ? "var(--bg-primary)" : "var(--text-primary)"};
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    border-color: var(--border-dark);
    background-color: ${({ $selected }) =>
      $selected ? "var(--text-primary)" : "var(--bg-primary)"};
  }
`;

export const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  border: 1.5px solid var(--border-color);
  width: fit-content;

  button {
    width: 44px;
    height: 44px;
    border: none;
    background: var(--bg-surface);
    color: var(--text-primary);
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.15s ease;
    flex-shrink: 0;

    &:hover:not(:disabled) {
      background-color: var(--bg-primary);
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  span {
    min-width: 48px;
    text-align: center;
    font-family: var(--font-sans);
    font-size: 0.9rem;
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: 1px;
    border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const AddToCartBtn = styled.button`
  width: 100%;
  padding: 16px 24px;
  background-color: var(--text-primary);
  color: var(--bg-primary);
  border: 2px solid var(--text-primary);
  font-family: var(--font-sans);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.added {
    background-color: transparent;
    color: var(--text-primary);
  }
`;

export const NotFoundBox = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const AuthPromptBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  margin-top: 4px;

  p {
    margin: 0;
    font-size: 0.76rem;
    font-weight: 600;
    color: var(--text-secondary);
    line-height: 1.4;
    letter-spacing: 0.3px;

    strong {
      color: var(--text-primary);
      font-weight: 800;
    }
  }

  .login-link {
    background: none;
    border: none;
    padding: 0;
    font-family: var(--font-sans);
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--text-primary);
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
    white-space: nowrap;
    transition: opacity 0.15s ease;

    &:hover {
      opacity: 0.7;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 10px 12px;
  }
`;
