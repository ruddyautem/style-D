import styled from "styled-components";

export const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${({ $imageUrl }) =>
    `url(https://wsrv.nl/?url=${encodeURIComponent($imageUrl)}&w=900&output=webp)`};
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const TopTag = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  padding: 4px 10px;
  z-index: 2;
`;

export const Body = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  transition: all 0.25s ease;
  z-index: 2;

  .title-block {
    display: flex;
    flex-direction: column;
    gap: 3px;

    h2 {
      font-family: var(--font-serif);
      font-size: 1.1rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin: 0;
      color: var(--text-primary);
      transition: color 0.25s ease;
    }

    .sub {
      font-size: 0.7rem;
      color: var(--text-secondary);
      letter-spacing: 0.5px;
      transition: color 0.25s ease;
    }
  }

  p {
    font-family: var(--font-sans);
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin: 0;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.25s ease;

    &::after {
      content: "↗";
      font-size: 0.85rem;
      transition: transform 0.2s ease;
    }
  }

  @media (max-width: 768px) {
    padding: 12px 16px;

    .title-block h2 {
      font-size: 0.95rem;
    }
    .title-block .sub {
      display: none;
    }

    p {
      font-size: 0.68rem;
    }
  }
`;

export const DirectoryItemContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-color);
  background-color: var(--bg-surface);
  cursor: pointer;

  &:hover {
    border-color: var(--border-dark);

    ${BackgroundImage} {
      transform: scale(1.03);
    }

    ${Body} {
      background-color: var(--text-primary);
      border-top-color: var(--text-primary);

      h2 {
        color: var(--bg-primary);
      }

      p {
        color: var(--bg-primary);

        &::after {
          transform: translate(2px, -2px);
        }
      }
    }
  }
`;