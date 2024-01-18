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




        </div>
    );

}


export default Card;