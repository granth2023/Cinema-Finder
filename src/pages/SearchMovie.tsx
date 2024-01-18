import React, { useState } from 'react';
import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;

interface Movie {
    Title: string;
    Poster: string;
    imdbID: string; // Unique identifier for each movie
}

const SearchMovie: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMovie = async () => {
        setLoading(true);
        setError(null);

        let apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
        if (year.trim() !== '') {
            apiUrl += `&y=${year.trim()}`;
        }

        try {
            const res = await fetch(apiUrl);

            if (!res.ok) {
                throw new Error('Something went wrong');
            }

            const data = await res.json();

            if (data.Search && data.Search.length > 0) {
                setMovie(data.Search[0]);
            } else {
                setError("No results found");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addToFavorites = async () => {
        try {

        const userId =  localStorage.getItem('userId');

        if(!userId){
            console.error('User ID not foundin local storage');
            return;
        }

        const body = { userId, movie };
        const response = await axios.post('/api/favorite/add', body);

        if(response.data.error){
            console.error(response.data.error);
            return;
        }
            
            alert('Movie added to favorites!');
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    const addToWatchlist = async () => {
        try {
            // Replace with your API endpoint that handles adding movies to watchlist
            await axios.post('/api/addToWatchlist', movie);
            alert('Movie added to watchlist!');
        } catch (error) {
            console.error('Error adding to watchlist:', error);
        }
    };

    return (
        <div>
            <input type="text" onChange={(e) => setQuery(e.target.value)} placeholder="Movie Title" />
            <input type="text" placeholder="Release Year (Optional)" onChange={(e) => setYear(e.target.value)} />
            <button onClick={fetchMovie}>Search</button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {movie && !loading && !error && (
                <div>
                    <h1>{movie.Title}</h1>
                    <img src={movie.Poster} alt={movie.Title} />
                    <button onClick={addToFavorites}>Add to Favorites</button>
                    <button onClick={addToWatchlist}>Add to Watchlist</button>
                </div>
            )}
        </div>
    );
};

export default SearchMovie;