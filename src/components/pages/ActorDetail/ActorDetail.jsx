import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

import { useGetStaffByIdQuery } from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';

export default function ActorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetStaffByIdQuery(id);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" margin="auto">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) return <ErrorMessage />;

  return (
    <>
      <Grid container pt={1} spacing={4}>
        <Grid item xs={12} md={4}>
          <img
            src={data.posterUrl}
            alt={data.nameEn}
            style={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Stack flexDirection="row">
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              color="primary"
            ></Button>
            <Stack flexDirection="column">
              <Typography gutterBottom variant="h5">
                {data.nameRu}
              </Typography>
              <Typography gutterBottom>{data.nameEn}</Typography>
            </Stack>
          </Stack>
          <Typography gutterBottom variant="h5">
            About actor
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>Carrer</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{data.profession}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Hight</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{data.growth}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Date of birth</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {data.birthday} ({data.age} years)
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>At all movies</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{data.films.length}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography gutterBottom>Facts</Typography>
            </Grid>
            <Grid item xs={12}>
              {data.facts.map((fact, index) => (
                <Typography gutterBottom key={index}>
                  {++index}. {fact}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>Movies</Typography>
        </Grid>
      </Grid>
      <Stack>
        {data.films
          .filter(
            (item, index, self) =>
              (index = self.findIndex(el => el.filmId === item.filmId)),
          )
          .map((film, index) => (
            <Stack
              key={film.filmId}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography gutterBottom>{++index}</Typography>
              <Link component={RouterLink} to={`/movie/${film.filmId}`}>
                {film.nameEn ? film.nameEn : film.nameRu}
              </Link>
              <Typography gutterBottom>{film.rating}</Typography>
            </Stack>
          ))}
      </Stack>
    </>
  );
}
