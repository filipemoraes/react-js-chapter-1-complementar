import { useState, useEffect } from 'react';

import './../styles/header.scss';

interface Props {
  title: string;
}

export function Header(props: Props) {
  const [title, setTitle] = useState<String>('');

  useEffect(() => {
    setTitle(props?.title);
  }, [props.title]);

  return (
    <header>
      <span className="category">Categoria:<span> {title}</span></span>
    </header>
  );
}
