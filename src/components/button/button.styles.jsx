import styled from 'styled-components';

export const BaseButton = styled.button`
  min-width: 150px;
  width: auto;
  height: 45px;
  letter-spacing: 2px;
  padding: 0 25px;
  font-size: 0.75rem;
  background-color: black;
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  border: 1px solid black;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
  }
`;

export const GoogleSignInButton = styled(BaseButton)`
  background-color: #fff;
  color: #4285f4;
  border: 1px solid #4285f4;

  &:hover {
    background-color: #4285f4;
    color: white;
    border: 1px solid #4285f4;
  }
`;

export const InvertedButton = styled(BaseButton)`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
  }
`;