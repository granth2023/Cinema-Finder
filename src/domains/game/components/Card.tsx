import React from 'react';

interface CardProps {
    backImage: string;
    frontImage: string;
}

const Card: React.FC<CardProps> = ({ backImage, frontImage }) => {

    return (
        <div className="card">
            <div className="card-back card-face">


                
            </div>




        </div>
    );

}


export default Card;