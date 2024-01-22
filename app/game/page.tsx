import React from 'react';

import GameBoard from './components/GameBoard';

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
            <GameBoard initalData={gameData} />
        </div>
    )

}
export default GamePage;

async function fetchGameData(){

    return{

    } 
}
