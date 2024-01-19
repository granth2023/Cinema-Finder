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
    const [isFlipped, setIsFlipped] = useState(false)

    const handleClick = () => {
        setIsFlipped(!isFlipped)
        onCardClick({ backImage, frontImage })
    }

    return (
        <div className={` card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>

            <div className="card-back card-face">
                <img className='movie-reel' src={backImage} alt="Card Back" />
             </div>
             <div className="card-front card-face">
                <img className="card-value" src={frontImage} alt="Card Front" />
             </div>
        </div>
    );

};
export default Card;