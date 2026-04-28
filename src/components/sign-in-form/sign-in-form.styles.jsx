import styled from 'styled-components';

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;

  h2 {
    margin: 10px 0;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.5px;
  }

  span {
    color: #666;
    margin-bottom: 20px;
    font-size: 0.9rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;