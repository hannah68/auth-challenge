import { useEffect, useState } from 'react'
const apiUrl = 'http://localhost:4000';
import MovieForm from './MovieForm'

const Movie = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getAllMovies = async() => {
      const res = await fetch(`${apiUrl}/movie`);
      const data = await res.json();
      setMovies(data);
    }
    getAllMovies();
  }, []);
  

  return (
    <div>
        <h1>Welcome to movie page</h1>
        <h2>This is a list of movies</h2>
        <ul>
          {movies.map((movie, index) => {
            return (
              <li key={index}>
                <p>{movie.title}</p>
                <p>{movie.runtimeMins}</p>
              </li>
            )
          })}
        </ul>
        <h3>Do you want to add more movies to the list?</h3>
        <MovieForm setMovies={setMovies} movies={movies}/>
    </div>
  )
}

export default Movie