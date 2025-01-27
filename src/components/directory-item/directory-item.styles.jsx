import styled from "styled-components";

export const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`;

export const Body = styled.div`
  position: absolute;
  padding: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;

  h2 {
    font-weight: bold;
    margin: 0 0 5px;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: right;
    width: 100%;
  }

  p {
    font-weight: normal;
    font-size: 16px;
    margin: 0;
    opacity: 0.8;
    text-align: center;
    width: 100%;
  }
`;

export const DirectoryItemContainer = styled.div`
  height: 500px;
  min-width: 25%;
  flex: 1 1 auto;
  display: flex;
  -moz-box-align: center;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 7.5px 15px;
  overflow: hidden;

      ${BackgroundImage} {
      transform: scale(1);
      transition: transform 0.3s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }

  &:hover {
    cursor: pointer;

    ${BackgroundImage} {
      transform: scale(1.1);
      transition: transform 0.6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }

    ${Body} {
      opacity: 1;
    }
  }

  &:first-child {
    margin-right: 7.5px;
  }

  &:last-child {
    margin-left: 7.5px;
  }
`;
