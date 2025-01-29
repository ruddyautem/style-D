import styled from "styled-components";

export const CheckoutContainer = styled.div`
  width: 55%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;
`;

export const CheckoutHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
`;
export const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 23%;

  &:last-child {
    width: 7%;
  }
`;

export const Total = styled.span`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`;

export const CheckoutButton = styled.button`
  width: 25%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 24px;
  margin-top: 10px;
  margin-left: auto;

  &:hover {
    background-color: #0056b3;
  }
`;

export const EmptyCartMessage = styled.div`
  font-size: 32px;
  color: #333;
  text-align: center;
  margin-top: 30px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
`;

export const InfoCBContainer = styled.div`
width:100%
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  font-size: 22px;
  border: 1px solid red;
  padding: 10px;
`;
export const InfoCB = styled.span`
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  color: red;
`;
