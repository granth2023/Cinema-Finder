import React, { useState } from 'react';

const SearchMovie = () => {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovie = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/searchMovie?query=${query}`);
      if (!res.ok) {
        throw new Error('Something went wrong');
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
      <button onClick={fetchMovie}>Search</button>
      
      {loading && <p>Loading...</p>}
      
      {error && <p>Error: {error}</p>}
      
      {movie && !loading && !error && (
        <div>
          <h1>{movie.title}</h1>
          <img src={movie.poster} alt={movie.title} />
          {/* Display other movie details here */}
        </div>
      )}
    </div>
  );
};

export default SearchMovie;
