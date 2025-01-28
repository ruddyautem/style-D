import styled from "styled-components";

export const Container = styled.div`
min-height:80vh;
justify-content:center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  text-align: center;
   Button {
    margin-top: -10px;
  
`;

export const Title = styled.h1`
  font-size: 36px;
  margin-bottom: -10px;
`;

export const Message = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

export const OrderNumber = styled.p`
  font-size: 16px;
  margin-bottom: -10px;
  font-weight: bold;

  span {
    color: rgb(14, 175, 9);
    font-size: 20px;
    font-weight: bold;
  }

  Button {
    padding-top: 300px;
  }
`;
