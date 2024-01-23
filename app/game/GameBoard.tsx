import React, { useState, useEffect } from 'react';
import Card from './components/Card';

type CardType = {
    id: number, 
    frontImage: string;
    matched: boolean;
}

const GameBoard: React.FC = () => {
    const [cards, setCards] = useState<CardType[]>([]);
    const[flippedIndices, setFlippedIndices]= useState<number[]>([]);
    const [matchesFound, setMatchesFound] = useState<number>(0);


    useEffect(() => {
      const initializedCards = initializeCards();
      setCards(initializedCards);
    }, []);

    const handlCardClick =( index: number) => {
        if(flippedIndices.length ===2) {
            return;
        }
        setFlippedIndices(prev=> [...prev,index]);

        if(flippedIndices.length === 1){
            const firstCard = cards[flippedIndices[0]];
            const secondCard = cards[index];

            if(firstCard.id === secondCard.id) {
                setMatchesFound(prev => prev + 1);
                setCards(prevCards =>
                    prevCards.map(card =>
                        card.id == firstCard.id ? { ...card, matched: true} :card 
                        )
                    );

            }
            setTimeout (() => {
                setFlippedIndices([])
            }, 1000);
            
        };
    };
    const initializeCards: (): CardType[] => {
        const cardImages = [
            'public/newfugitive.jpeg',
            'public/newheat.jpeg',
            'public/newindiana.jpeg',
            'public/newmatriximage.jpeg',
            'public/newmission.jpeg'
        ]
        let cards: CardType[] = [];

        cardImages.forEach((image, index) => {
            for(let i = 0; i < 2 ; i++){
                cards.push({ id: index * 2 +i , frontImage: image, matched: false });
            });
            return shuffleArray(cards);
    }

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
