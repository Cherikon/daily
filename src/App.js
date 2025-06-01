import React, {useState} from 'react';
import {
    addStyles,
    Button,
    ConfettiPiece,
    generateKeyframes,
    Header,
    MainBlock,
    Result,
    Image,
    ContentBlock
} from "./styles";
import fon from './images/fon.png'

const Confetti = ({pieces}) => (
    <>
        {pieces.map((piece) => (
            <ConfettiPiece
                key={piece.id}
                id={piece.id}
                color={piece.color}
                shape={piece.shape}
                left={piece.left}
                bottom={piece.bottom}
            />
        ))}
    </>
);

export const App = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [confettiPieces, setConfettiPieces] = useState([]);
    const [cleanupFunctions, setCleanupFunctions] = useState([]);

    const createConfetti = () => {
        cleanupFunctions.forEach(cleanup => cleanup());
        setCleanupFunctions([]);
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
        const shapes = ['square', 'circle'];
        const newPieces = [];
        const styles = [];
        const newCleanupFunctions = [];

        for (let i = 0; i < 99; i++) {
            const id = `left-${Date.now()}-${i}`;
            const angle = Math.random() * Math.PI * 4;
            const distance = 100 + Math.random() * 500;

            const keyframesCSS = generateKeyframes(id, 0, 0, angle, distance);
            styles.push(keyframesCSS);

            newPieces.push({
                id,
                color: colors[Math.floor(Math.random() * colors.length)],
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                left: window.innerWidth,
                bottom: 0,
            });
        }

        for (let i = 0; i < 99; i++) {
            const id = `bottom-${Date.now()}-${i}`;
            const angle = Math.random() * Math.PI / 2 - Math.PI / 2;
            const distance = 100 + Math.random() * 500;

            const keyframesCSS = generateKeyframes(id, 0, 0, angle, distance);
            styles.push(keyframesCSS);

            newPieces.push({
                id,
                color: colors[Math.floor(Math.random() * colors.length)],
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                left: 0,
                bottom: 0,
            });
        }

        const styleString = styles.join('');
        const cleanup = addStyles(styleString);
        newCleanupFunctions.push(cleanup);

        setConfettiPieces(newPieces);
        setCleanupFunctions(newCleanupFunctions);

        setTimeout(() => {
            setConfettiPieces([]);
        }, 1000);
    };

    return (
        <MainBlock>
            <ContentBlock>
            <span>
            Участвует 10 человек
            </span>
                <Header>Рандомный выбор стартующего на дейликах</Header>
                {/*<Image src={fon}/>*/}

                <Button onClick={() => {
                    setLoading(true);
                    setResult('');

                    setTimeout(() => {
                        setLoading(false)
                        setResult('Сергей Юхно')
                        createConfetti()
                    }, 3000)
                }}
                        $rotate={loading}
                >
                    Let's get the ball rolling!
                </Button>
                {result ? <Result>{result}</Result> : <div style={{height: 95}}/>}
                <Confetti pieces={confettiPieces}/>
            </ContentBlock>
        </MainBlock>
    );
};

