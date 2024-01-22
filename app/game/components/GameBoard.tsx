import React, { useState, useEffect } from 'react';
import Card from './Card';

interface CardData {
    frontImage: string;
    matched: boolean;
}

const GameBoard: React.FC = () => {
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [flippedCards, setFlippedCards] = useState<CardData[]>([]);
    const [cards, setCards] = useState<CardData[]>([
        { frontImage: 'newmatrixImage.jpeg', matched: false },  { frontImage: 'newmatrixImage.jpeg', matched: false },  { frontImage: 'newmatrixImage.jpeg', matched: false },  { frontImage: 'newmatrixImage.jpeg', matched: false },  { frontImage: 'newmatrixImage.jpeg', matched: false },  { frontImage: 'newmatrixImage.jpeg', matched: false },
        // ...other card objects
    ]);

    useEffect(() => {
        if (gameStarted) {
            setCards(shuffle(cards));
        }
    }, [gameStarted, cards]);

    const startGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setFlippedCards([]);
        setCards(cards.map(card => ({ ...card, matched: false })));
    };

    const shuffle = (cardsArray: CardData[]): CardData[] => {
        return cardsArray.sort(() => Math.random() - 0.5);
    };

    const handleCardClick = (clickedCard: CardData) => {
        if (flippedCards.length < 2) {
            setFlippedCards([...flippedCards, clickedCard]);
            // Add more logic here if needed
        }
    };

    const renderCards = () => {
        return cards.map((card, index) => (
            <Card 
                key={index}
                backImage='reel.png' 
                frontImage={card.frontImage}
                onCardClick={() => handleCardClick(card)}
                flipped={flippedCards.includes(card)}
                matched={card.matched}
            />
        ));
    };

    return (
        <div>
            {!gameStarted && (
                <button onClick={startGame}>Start Game</button>
            )}
            {gameOver && (
                <div>Game Over! <button onClick={startGame}>Restart</button></div>
            )}
            <div className='grid grid-cols-4 gap-4 justify-center m-4'>
                {gameStarted && renderCards()}
            </div>
        </div>
    );
};

export default GameBoard;
