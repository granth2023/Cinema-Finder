// "use client"

import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import SearchMovie from './SearchMovie';

function HomePage(){
    return (
        <div>
          <NavBar />
          <SearchMovie/>
          </div>

    )
}

export default HomePage;