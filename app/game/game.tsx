import React form 'react';
import dynamic from "next/dynamic";

const GameBoard = dynamic(() => import('./GameBoard'), {ssr: false})    

const GamePage: React.FC = () => {
    return (
        <div className="container mx-auto p-4"> 
        
        
        </div>
    )
}