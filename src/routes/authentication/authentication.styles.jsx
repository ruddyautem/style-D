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
    margin: 20px auto;
  }

  @media (max-width: 480px) {
    padding: 20px 14px;
    gap: 32px;
  }

  @media (max-width: 380px) {
    padding: 16px 10px;
    gap: 28px;
  }
`;