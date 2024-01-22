import React from 'react';

import GameBoard from '../../app/game/components/GameBoard';

export async function getServerSideProps(context){
    const gameData =await fetchGameData();

    return {
        props: {
            gameData,
        },
    };
}

const GamePage: React.FC = () => {
    return (
        <div>
            <h1>Memory Game</h1>
            <GameBoard />
            {/* <GameBoard initialData={gameData} /> */}
        </div>
    )

}
export default GamePage;

async function fetchGameData(){

    return{

    } 
}
