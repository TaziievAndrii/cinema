import { ArrowBack } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { MOVIE_LISTS } from '../../../constants';
import {
  useGetFilmsQuery,
  useGetGenreAndCountriesQuery,
} from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage';
import MoviesList from '../../ui/MoviesList';
import SelectMovies from '../../ui/SelectMovies';
import MoviesListMainSkeleton from './MoviesListMainSkeleton';

export default function MoviesListMain() {
  const location = useLocation();
  const { countries, order, year, genreId } = useSelector(
    state => state.currentQuerySlice || {},
  );

  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const movieType = MOVIE_LISTS.find(el => el.url === location.pathname);

  const myGenreId = movieType.url === '/cartoons' ? 18 : genreId;

  const responseFilmsQuery = useGetFilmsQuery({
    type: movieType.value,
    page,
    countries,
    order,
    year,
    genreId: myGenreId,
  });

  const responseGenreAndCountriesQuery = useGetGenreAndCountriesQuery();

  useEffect(() => {
    setPage(1);
  }, [location]);

  if (responseFilmsQuery.error || responseGenreAndCountriesQuery.error)
    return <ErrorMessage />;
  if (responseFilmsQuery.isLoading || responseGenreAndCountriesQuery.isLoading)
    return <MoviesListMainSkeleton />;

  return (
    <>
      <Stack flexDirection="row" sx={{ mt: 2, mb: 2 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} />
        <Typography variant="h4">{movieType.title}</Typography>
      </Stack>
      <SelectMovies
        countries={countries}
        order={order}
        year={year}
        genreId={genreId}
        countriesList={responseGenreAndCountriesQuery.data.countries}
        genresList={responseGenreAndCountriesQuery.data.genres}
      />
      <MoviesList
        movies={responseFilmsQuery.data.items}
        totalPages={responseFilmsQuery.data.totalPages}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
