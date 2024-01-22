import React form 'react';
import dynamic from "next/dynamic";

const GameBoard = dynamic(() => import('./GameBoard'), {ssr: false})    

const GamePage: React.FC = () => {
    return (
        <div className="container mx-auto p-4"> 
            <h1 className= "text-3x1 font-bold mb-4"> Memory Game</h1>
        
        </div>
    )
}