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
    


    return (
        <div className={`realtive h-40 w-40 m-2 ${flipped || matched ? '' : 'bg-blue-500'}`} onClick={onCardClick}>
            <img
                src={backImage}
                alt="Card Back"
                className={`aboslute inset-0 h-full w-full object-cover ${ flipped ?'hidden' : ''}`}


            />
            <img 
                src={frontImage}
                alt="Card Front"
                className={`absoltue inset-0 h-full w-full object-cover ${flipped ? '' : 'hidden' }`}
                />

          </div>
    );

};
export default Card;

//what is useEffect?
// fetched api data -- lifecycle methods -- whatever function 
//useEfect lets us handle changes: what are 3 lifecycle methods: did mount, did update, unmounted