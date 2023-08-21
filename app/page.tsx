import { useEffect, useState } from 'react'
import Modal from '../app/components/Modal'
import FindTheaterPage from '../app/findTheater/page';

type Movie = {
  id: number;
  title: string;
};

function HomePage(){
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/movies')
      .then(response => response.json())
      .then(fetchedMovies => setMovies(fetchedMovies))

  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

return (
  <div>
    <button onClick={handleOpenModal}>Find Theater</button>

    <Modal show={isModalOpen} onClose={handleCloseModal}>
      <FindTheaterPage />
      </Modal>

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