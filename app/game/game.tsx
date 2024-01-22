import React form 'react';
import dynamic from "next/dynamic";

const GameBoard = dynamic(() => import('./GameBoard'), {ssr: false})    

const GamePage: React.Fc