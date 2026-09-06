import styled from 'styled-components';

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;

  h2 {
    margin: 10px 0;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.5px;
    word-break: break-word;

    @media (max-width: 400px) {
      font-size: 1.35rem;
    }
  }

  span {
    color: #666;
    margin-bottom: 20px;
    font-size: 0.9rem;
    line-height: 1.4;
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