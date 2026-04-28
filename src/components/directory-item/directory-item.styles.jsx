import styled from "styled-components";

export const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${({ $imageUrl }) => `url(${$imageUrl})`};
  transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
`;

export const Body = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 40px;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  transition: transform 0.4s ease;
  transform: translateY(10px);

  h2 {
    font-size: clamp(1.5rem, 4vw, 2.2rem);
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin: 0;
  }

  p {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-top: 10px;
    opacity: 0.7;
    
    &::after {
      content: ' →';
    }
  }
`;

export const DirectoryItemContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  background-color: #fff;

  &:hover {
    cursor: pointer;

    ${BackgroundImage} {
      transform: scale(1.05);
    }

    ${Body} {
      transform: translateY(0);
      background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%);
    }
  }
`;