"use client";

import React, { useState, useEffect } from 'react';
import Card from './components/Card';

type CardType = {
    id: number;
    frontImage: string;
    matched: boolean;
};

const GameBoard: React.FC = () => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [matchesFound, setMatchesFound] = useState<number>(0);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);

    useEffect(() => {
        if (gameStarted) {
            const initializedCards = initializeCards();
            setCards(initializedCards);
            setFlippedIndices([]);
            setMatchesFound(0);
            setGameOver(false);
        }
    }, [gameStarted]);

    const handleCardClick = (index: number) => {
        if (flippedIndices.length === 2 || flippedIndices.includes(index)) {
            return;
        }

        const newFlippedIndices = [...flippedIndices, index];
        setFlippedIndices(newFlippedIndices);

        if (newFlippedIndices.length === 2) {
            const firstCard = cards[newFlippedIndices[0]];
            const secondCard = cards[newFlippedIndices[1]];

            if (firstCard.id === secondCard.id) {
                setMatchesFound(prev => prev + 1);
                setCards(prevCards =>
                    prevCards.map(card =>
                        card.id === firstCard.id ? { ...card, matched: true } : card
                    )
                );
            }

            setTimeout(() => {
                setFlippedIndices([]);
                if (matchesFound === cards.length / 2 - 1) {
                    setGameOver(true);
                }
            }, 1000);
        }
    };

    const initializeCards = (): CardType[] => {
        const cardImages = [
            'public/newfugitive.jpeg',
            'public/newheat.jpeg',
            'public/newindiana.jpeg',
            'public/newmatriximage.jpeg',
            'public/newmission.jpeg'
        ];
        let cards: CardType[] = [];

        cardImages.forEach((image, index) => {
            for (let i = 0; i < 2; i++) {
                cards.push({ id: index, frontImage: image, matched: false });
            }
        });
        return shuffleArray(cards);
    };

    const shuffleArray = <T,>(array: T[]): T[] => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const startGame = () => {
        setGameStarted(true);
    };

    const renderCards = () => {
        return cards.map((card, index) => (
            <Card
                key={index}
                backImage='reel.png'  // Path to the back image
                frontImage={card.frontImage}
                onClick={() => handleCardClick(index)}
                flipped={flippedIndices.includes(index) || card.matched}
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
            <div className='grid grid-cols-6 gap-4 justify-center m-4'>
                {gameStarted && renderCards()}
            </div>
        </div>
    );
};

export default GameBoard;
