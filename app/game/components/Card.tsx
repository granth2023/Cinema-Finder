import React, { useState } from 'react';

interface CardProps {
    backImage: string;
    frontImage: string;
    onCardClick: () => void;
    flipped: boolean;
    matched: boolean;
}
//manage state of each card either flipped or not
const Card: React.FC<CardProps> = ({ backImage, frontImage, onCardClick, flipped, matched }) => {
    const cardClasses = `relative h-40 w-40 m-2 transform ${flipped || matched ? 'rotate-y-180' : ''}`;

    return (
        <div className={cardClasses} onClick={onCardClick}>
            <img
                src={backImage}
                alt="Card Back"
                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-linear ${flipped ? 'hidden' : ''}`}
            />
            <img 
                src={frontImage}
                alt="Card Front"
                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-linear ${flipped ? '' : 'hidden'}`}
            />
        </div>
    );
};
export default Card;

//what is useEffect?
// fetched api data -- lifecycle methods -- whatever function 
//useEfect lets us handle changes: what are 3 lifecycle methods: did mount, did update, unmounted