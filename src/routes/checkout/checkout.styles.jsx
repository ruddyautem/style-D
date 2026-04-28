import styled from "styled-components";

export const CheckoutContainer = styled.div`
  width: 90%;
  max-width: 800px;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto 100px;

  @media (max-width: 768px) {
    width: 95%;
    margin-top: 20px;
  }
`;

export const CheckoutHeader = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #000;

  @media (max-width: 600px) {
    display: none; /* Headers take up too much space on mobile */
  }
`;

export const HeaderBlock = styled.div`
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.75rem;
  font-weight: 600;
  width: 23%;

  &:last-child {
    width: 8%;
    text-align: right;
  }
`;

export const Total = styled.div`
  margin-top: 40px;
  margin-left: auto;
  font-size: 1.8rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

export const EmptyCartMessage = styled.div`
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #888;
  text-align: center;
  margin-top: 100px;
  font-weight: 200;
`;

export const InfoCBContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 50px;
  padding: 20px;
  background-color: #f9f9f9;
  border-left: 2px solid #000;
  font-size: 0.8rem;
  letter-spacing: 1px;
  color: #555;
`;

export const InfoCB = styled.span`
  margin-top: 10px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #000;
  font-family: monospace;
`;