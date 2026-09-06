import styled from 'styled-components';

export const AuthentificationContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  justify-content: space-around;
  margin: auto;
  gap: 40px;
  padding: 24px 20px;

  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
    margin: 20px auto;
  }
`;