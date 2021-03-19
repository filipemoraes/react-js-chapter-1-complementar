import { useEffect, useState } from 'react';
import { MovieCard } from './components/MovieCard';
import { SideBar } from './components/SideBar';
// import { Content } from './components/Content';
import { api } from './services/api';

import './styles/global.scss';
import './styles/content.scss';


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

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function App() {

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    if(selectedGenre?.id) {
      api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenre.id}`).then(response => {
        setMovies(response.data);
      });
    }
  }, [selectedGenre]);


  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar onSelectedGenre={setSelectedGenre} />

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
    </div>
  )
}