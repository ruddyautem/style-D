import styled from "styled-components";

export const SwitcherContainer = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: var(--bg-surface);
  border: 1.5px solid var(--border-color);
  padding: 2px;
  box-sizing: border-box;
  user-select: none;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: var(--text-primary);
  }

  ${({ $variant }) =>
    $variant === "drawer" &&
    `
    width: 100%;
    justify-content: center;
    padding: 3px;
    margin-top: 10px;
    background-color: var(--bg-primary);
  `}
`;

export const LanguageButton = styled.button`
  background: ${({ $isActive }) =>
    $isActive ? "var(--text-primary)" : "transparent"};
  color: ${({ $isActive }) =>
    $isActive ? "var(--bg-primary)" : "var(--text-secondary)"};
  border: none;
  font-family: var(--font-sans);
  font-size: ${({ $variant }) => ($variant === "drawer" ? "0.78rem" : "0.72rem")};
  font-weight: 800;
  letter-spacing: 1.2px;
  padding: ${({ $variant }) => ($variant === "drawer" ? "6px 16px" : "4px 8px")};
  cursor: pointer;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;

  ${({ $variant }) =>
    $variant === "drawer" &&
    `
    flex: 1;
  `}

  &:hover {
    color: ${({ $isActive }) =>
      $isActive ? "var(--bg-primary)" : "var(--text-primary)"};
  }
`;

export const Separator = styled.span`
  color: var(--border-color);
  font-size: 0.65rem;
  font-weight: 400;
  padding: 0 1px;
  display: ${({ $variant }) => ($variant === "drawer" ? "none" : "inline-block")};
`;
