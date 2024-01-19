import React, { useState } from 'react';
import Card from './Card';




const GameBoard = () => {

    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false)
    const [flippedCards, setFlippedCards] = useState([]);
    const [card, setCards] = useState([]);

    const startGame = () => {
        setGameStarted(true);
    }
    const handleGameOver = () => {
        setGameOver(true);
    }
    const handleCardClick = (card) => {
        setFlippedCards([...flippedCards, card]);
    }

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