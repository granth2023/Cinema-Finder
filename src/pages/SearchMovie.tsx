import React, { useState } from 'react';

const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;

interface Movie {
  Title: string;
  Poster: string;
}

const SearchMovie: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovie = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=edbd78e7&s=${query}`);

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

  return (
    <div>
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
      <button onClick={fetchMovie}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {movie && !loading && !error && (
        <div>
          <h1>{movie.Title}</h1>
          <img src={movie.Poster} alt={movie.Title} />
        </div>
      )}
    </div>
  );
};

export default SearchMovie;
