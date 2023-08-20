import { useEffect, useState } from 'react'

type Movie = {
  id: number;
  title: string;
}

function HomePage(){
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    fetch('/api/movies')
      .then(response => response.json())
      .then(fetchedMovies => setMovies(fetchedMovies))

  }, [])

return (
  <div>
    {movies && movies.map(movie => (
      <div key={movie.id}>
          <h2>{movie.title}</h2>
          {/* display screenings and favorites */}
          

      </div>  
    ))}

  </div>
)
    }

    export default HomePage