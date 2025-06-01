import styled, {css, keyframes} from "styled-components";

export const MainBlock = styled.div`
    font-family: "Caveat", cursive;
    text-align: center;
    color: white;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    max-width: 1100px;
    margin: 0 auto;
    position: relative;

    span {
        font-size: 40px;
        color: #8f8e8e;
    }
`

export const Button = styled.button`
    all: unset;
    margin-top: 50px;
    font-size: 36px;
    border: 1px solid white;
    padding: 16px;
    color: white;
    cursor: pointer;
    transition: .3s;
    animation: ${({$rotate}) => $rotate ? 'spin 2.9s cubic-bezier(0, 0, 0.5, 1) forwards' : 'none'};


    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(1080deg);
            animation-timing-function: cubic-bezier(0.9, 0, 1, 1);
        }
    }

    &:hover {
        border-radius: 40px;
    }
);
`

export const Header = styled.div`
    font-size: 90px;
`

export const Result = styled.div`
    font-size: 75px;
`

export const generateKeyframes = (id, startX, startY, angle, distance) => {
    const endX = startX + Math.cos(angle) * distance;
    const endY = startY + Math.sin(angle) * distance;
    const rotation = angle * (180 / Math.PI);

    return `
    @keyframes confetti-${id} {
      0% {
        transform: translate(${startX}px, ${startY}px) rotate(0deg);
        opacity: 1;
      }
      70% {
        opacity: 1;
      }
      100% {
        transform: translate(${endX}px, ${endY}px) rotate(${rotation}deg);
        opacity: 0;
      }
    }
  `;
};

export const addStyles = (styles) => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
    return () => document.head.removeChild(styleElement);
};


export const ConfettiPiece = styled.div`
  position: fixed;
  width: 10px;
  height: 10px;
  background-color: ${props => props.color};
  border-radius: ${props => (props.shape === 'circle' ? '50%' : '2px')};
  animation: ${props => `confetti-${props.id} 0.8s ease-out forwards`};
  left: ${props => props.left}px;
  bottom: ${props => props.bottom}px;
  z-index: 1000;
`;
