import { useEffect, useState } from 'react';
import { MovieCard } from './MovieCard';
import { api } from './../services/api';
import { Genre } from '../interfaces/Genre';

import './../styles/content.scss';

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface Props {
  selectedGenre: Genre;
}

export function Content(props: Props) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  useEffect(() => {
    if(props.selectedGenre?.id) {
      api.get<MovieProps[]>(`movies/?Genre_id=${props.selectedGenre.id}`).then(response => {
        setMovies(response.data);
        setSelectedGenre(props.selectedGenre);
      });
    }
  }, [props.selectedGenre]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  );
}