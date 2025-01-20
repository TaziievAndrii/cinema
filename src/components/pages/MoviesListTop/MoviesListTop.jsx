import React from 'react';

import { useGetFilmsTopQuery } from '../../../services/kinopoiskApi';

export default function MoviesListTop() {
  const { data, error, isLoading } = useGetFilmsTopQuery({
    type: 'TOP_POPULAR_ALL',
    page: 1,
  });
  console.log('data, error, isLoading', data, error, isLoading);

  return <div>MoviesListTop</div>;
}
