import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95) translateY(12px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(18, 18, 18, 0.65);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const ModalCard = styled.div`
  background-color: var(--bg-primary);
  border: 1px solid var(--border-dark);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 440px;
  padding: 24px;
  box-sizing: border-box;
  animation: ${slideUp} 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  .modal-title {
    font-family: var(--font-serif);
    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-primary);
    margin: 16px 0 14px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);

  .header-left {
    display: flex;
    align-items: center;
    gap: 8px;

    .badge {
      font-size: 0.65rem;
      font-weight: 800;
      letter-spacing: 2px;
      color: var(--text-secondary);
    }

    .logo-icon {
      width: 16px;
      height: 16px;
    }
  }

  .close-btn {
    background: transparent;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      color: var(--text-primary);
      transform: scale(1.15);
    }
  }
`;

export const ProductPreviewBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  padding: 12px 14px;
  margin-bottom: 14px;

  .thumb-box {
    width: 60px;
    height: 72px;
    flex-shrink: 0;
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .item-meta {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;

    .name {
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: var(--text-primary);
      text-transform: uppercase;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .price {
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .qty-tag {
      font-size: 0.68rem;
      color: var(--text-secondary);
      letter-spacing: 0.5px;
    }
  }
`;

export const Message = styled.p`
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0 0 20px;
`;

export const ModalActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const DeleteActionButton = styled.button`
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #b3261e;
    border-color: #b3261e;
    color: #ffffff;
  }
`;

export const KeepActionButton = styled.button`
  background-color: var(--text-primary);
  border: 1px solid var(--text-primary);
  color: var(--bg-primary);
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #262626;
    border-color: #262626;
  }
`;
