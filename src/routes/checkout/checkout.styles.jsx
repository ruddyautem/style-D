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

// TODO: left/right cols

// import styled from "styled-components";

// export const CheckoutContainer = styled.div`
//   width: 60%; // Increased from 55% to 60%
//   min-height: 80vh;
//   display: flex;
//   margin: 50px auto 0;
//   gap: 20px; // Added gap between columns;
//   scroll-y: none;
// `;

// export const LeftColumn = styled.div`
//   width: 90%;
//   overflow-y: auto;
//   max-height: calc(100vh - 200px);
//   padding-right: 20px; // Add some padding to prevent scrollbar overlap
// `;

// export const RightColumn = styled.div`
//   width: 10%;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-end;
//   position: sticky;
//   top: 50px;
//   padding-left: 20px;
// `;

// export const CheckoutHeader = styled.div`
//   width: 100%;
//   padding: 10px 0;
//   display: flex;
//   justify-content: space-between;
//   border-bottom: 1px solid darkgrey;
// `;

// export const HeaderBlock = styled.div`
//   text-transform: capitalize;
//   width: 23%;

//   &:last-child {
//     width: 7%;
//   }
// `;

// export const Total = styled.span`
//   font-size: 26px;
//   margin-bottom: 10px;

//   @media (max-width: 1870px) {
//     font-size: 18px;
//   }
// `;

// export const CheckoutActionContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
// `;

// export const EmptyCartMessage = styled.div`
//   font-size: 32px;
//   color: #333;
//   text-align: center;
//   margin-top: 30px;
//   padding: 20px;
//   background-color: rgba(255, 255, 255, 0.05);
//   border-radius: 10px;
// `;
