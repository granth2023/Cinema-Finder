import React, { useState } from 'react';

interface CardProps {
    backImage: string;
    frontImage: string;
    onClick: () => void;
    flipped: boolean;
    matched: boolean;
}
//manage state of each card either flipped or not
const Card: React.FC<CardProps> = ({ backImage, frontImage, onClick, flipped, matched }) => {
    return (
        <div className="relative h-40 w-40 m-2" onClick={onClick}>
            {flipped || matched ? (
                <img src={frontImage} alt="Card Front" className="h-full w-full object-cover" />
            ) : (
                <img src={backImage} alt="Card Back" className="h-full w-full object-cover" />
            )}
        </div>
    );
};

export default Card;

//what is useEffect?
// fetched api data -- lifecycle methods -- whatever function 
//useEfect lets us handle changes: what are 3 lifecycle methods: did mount, did update, unmounted