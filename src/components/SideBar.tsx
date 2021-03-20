import { useEffect, useState } from 'react';
import { Button } from './Button';
import { api } from './../services/api';
import { Genre } from '../interfaces/Genre';

import './../styles/sidebar.scss';

interface Props {
  onSelectedGenre: Function;
}

export function SideBar(props: Props) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Genre>(`genres/${selectedGenreId}`).then(response => {
      props.onSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => setSelectedGenreId(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
