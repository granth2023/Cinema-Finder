import React, { useState } from 'react';
import Card from './Card';




const GameBoard = () => {

    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false)

    const startGame = () => {
        setGameStarted(true);
    }
    const handleGameOver = () => {
        setGameOver(true);
    }

    return (
        <div className="game-container">
            <div className="game-info-container">
                <div className="game-info"> 
                    FLIPS <span id="flip">0</span>    
                
                </div>
                <div className="game-info">
                    Timer <span id ="time-remaining">30</span>
                </div>
                </div>
                <Card backImage="reel.png" frontImage="newmatriximage.jpeg"/>

        </div>


    )

}

export default GameBoard;