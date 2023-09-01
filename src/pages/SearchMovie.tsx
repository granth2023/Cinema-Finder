import React, { useState } from 'react';

const SearchMoive = () => {
    const [query, setQuery] = useState('');
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMovie =  async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/searchMovie?query=${query}');
            if(!res.ok) {
                throw Error('Something went wrong');
            }
            const data = await res.json();
            setMovie(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return ( 
        <div> 
            <input type="text" onChange={(e) => setQuery(e.target.value)} />
            <button onClick={fetch}>Search</button>

            {loading && <p>Loading...</p>}

            {error && <p>Error: {error}</p>}

            
        </div>

    )