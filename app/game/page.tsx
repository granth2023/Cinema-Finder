import React from 'react';

import GameBoard from './components/GameBoard';

const GamePage: React.FC = () => {
    return (
        <div>
            <h1>Memory Game</h1>
            <GameBoard />
        </div>
    )

}
export default GamePage;