import styled from "styled-components";

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;

  .img-container {
    width: 100%;
    aspect-ratio: 3 / 4;
    position: relative;
    overflow: hidden;
    background-color: var(--bg-surface);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    button {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      min-width: unset;
      height: 42px;
      font-size: 0.72rem;
      letter-spacing: 1.8px;
      font-weight: 700;
      text-transform: uppercase;
      background-color: var(--text-primary);
      color: var(--bg-primary);
      border: none;
      border-top: 1px solid var(--text-primary);
      border-radius: 0;
      opacity: 0;
      transform: translateY(100%);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover {
        background-color: #262626;
        color: #ffffff;
      }
    }
  }

  &:hover {
    border-color: var(--border-dark);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

    .img-container {
      img {
        transform: scale(1.03);
      }

      button {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  @media (max-width: 768px) {
    .img-container button {
      opacity: 1;
      transform: translateY(0);
      height: 38px;
      font-size: 0.68rem;
    }
  }
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  flex-shrink: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 8px 10px;
  }
`;

export const Name = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 72%;
  line-height: 1.2;
`;

export const Price = styled.span`
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
`;
