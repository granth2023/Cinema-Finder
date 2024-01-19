import React, { useState } from 'react';
import Card from './Card';




const GameBoard = () => {

    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false)
    const [flippedCards, setFlippedCards] = useState([]);
    //use state for cards need the array of image files?
    const [cards, setCards] = useState([{frontImage: 'newmatrixImage.jpeg', matched: false}]);

    const startGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setFlippedCards([]);
        setCards(cards.map(card => ({...card, matched: false})));
    }

    const shuffle = (cardsArray) => {
        return cardsArray.sort(() => Math.random() - 0.5)
    }

    const checkGameOver = () => {
        if(cards.every(card => card.matched)) {
            setGameOver(true);
    }
}
    const handleCardClick = (clickedCard) => {
        setFlippedCards([...flippedCards, clickedCard]);

        if(flippedCards.length === 1) {
            if (clickedCard.frontImage === flippedCards[0].frontImage) {
                //card match logic
                setCards(cards.map(card => 
                    card.frontImage === clickedCard.frontImage ? {...card, matched: true}: card )); 
                    setFlippedCards([]);
        } else {
            setTimeout(() => {
                setFlippedCards([]);
            }, 1000);
            }
        }
    };

    const renderCards = () => {
        return (
            <Card backImage='reel.png' frontImage="newmatriximage.jpeg" onCardClick={handleCardClick}/>
        )
    }
    return (
        <div>
            {!gameStarted && (
                <div className='overlay-welcome'>
                    <button onClick={startGame}>Click to Start</button>
                </div>
            )}
            {gameOver && (
                <div id='overlay-game-over'>
                    Try again!
                    <button onClick={() => { setGameStarted(false); setGameOver(false); }}>Restart</button>
                </div>
            )}
            <div className="game-container">
                {renderCards()}
            </div>
        </div>
    );
};
export default GameBoard;