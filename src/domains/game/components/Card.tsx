import React from 'react';

interface CardProps {
    backImage: string;
    frontImage: string;
}

const Card: React.FC<CardProps> = ({ backImage, frontImage }) => {

    return (
        <div className="card">
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