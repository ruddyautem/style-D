import styled from 'styled-components';

export const AuthentificationContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  justify-content: space-around;
  margin: auto;
  gap: 40px;
  padding: 24px 20px;
  box-sizing: border-box;

  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
    margin: 16px auto 8px;
  }

  @media (max-width: 480px) {
    padding: 16px 14px 6px;
    gap: 32px;
  }

  @media (max-width: 380px) {
    padding: 14px 10px 4px;
    gap: 28px;
  }
`;