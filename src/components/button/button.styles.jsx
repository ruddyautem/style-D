import styled from "styled-components";

export const BaseButton = styled.button`
  min-width: 150px;
  max-width: 100%;
  width: auto;
  box-sizing: border-box;
  height: 48px;
  letter-spacing: 1.8px;
  padding: 0 28px;
  font-size: 0.76rem;
  font-family: var(--font-sans);
  background-color: var(--text-primary);
  color: var(--bg-primary);
  text-transform: uppercase;
  font-weight: 600;
  border: 1px solid var(--text-primary);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background-color: #262626;
    color: #ffffff;
    border-color: #262626;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const GoogleSignInButton = styled(BaseButton)`
  background-color: #4285f4;
  color: #ffffff;
  border: 1px solid #4285f4;

  &:hover {
    background-color: #3367d6;
    border-color: #3367d6;
    color: #ffffff;
    box-shadow: 0 4px 14px rgba(66, 133, 244, 0.3);
  }
`;

export const InvertedButton = styled(BaseButton)`
  background-color: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-color);

  &:hover {
    background-color: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);
    box-shadow: none;
  }
`;