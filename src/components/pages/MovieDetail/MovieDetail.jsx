import { ArrowBack, Language, Movie } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link as ReactRouter, useNavigate, useParams } from 'react-router-dom';

import {
  useGetFilmQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffQuery,
} from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage';
import MovieCard from '../../ui/MovieCard/MovieCard';
import VideoPlayer from '../../ui/VideoPlayer';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const responseFilm = useGetFilmQuery(id);
  const responseSequelsAndPrequels = useGetSequelsAndPrequelsQuery(id);
  const responseStaff = useGetStaffQuery(id);

  if (
    responseFilm.isLoading ||
    responseSequelsAndPrequels.isLoading ||
    responseStaff.isLoading
  ) {
    return (
      <Box display="flex" justifyContent="center" margin="auto">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (
    responseFilm.error ||
    // responseSequelsAndPrequels.error ||
    responseStaff.error
  ) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Grid container spacing={2} sx={{ mt: { md: 2 } }} mt={2}>
        <Grid item xs={12} md={3}>
          <img
            width="100%"
            src={responseFilm.data.posterUrl}
            alt={
              responseFilm.data.nameOriginal
                ? responseFilm.data.nameOriginal
                : responseFilm.data.nameRu
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container>
            <Grid item xs={2}>
              <Button
                startIcon={<ArrowBack />}
                size="large"
                onClick={() => navigate(-1)}
              ></Button>
            </Grid>
            <Grid item xs={10} alignContent="center">
              <Typography variant="h5">
                {responseFilm.data.nameOriginal
                  ? responseFilm.data.nameOriginal
                  : responseFilm.data.nameRu}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography>Year</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{responseFilm.data.year}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Country</Typography>
            </Grid>
            <Grid item xs={6}>
              {responseFilm.data.countries.map(({ country }) => (
                <Typography key={country} gutterBottom>
                  {country}
                </Typography>
              ))}
            </Grid>

            <Grid item xs={6}>
              <Typography>Genre</Typography>
            </Grid>
            <Grid item xs={6}>
              {responseFilm.data.genres.map(({ genre }) => (
                <Typography key={genre} gutterBottom>
                  {genre}
                </Typography>
              ))}
            </Grid>

            <Grid item xs={6}>
              <Typography>Directors</Typography>
            </Grid>
            <Grid item xs={6}>
              {responseStaff.data
                .filter(el => el.professionKey === 'DIRECTOR')
                .map(staff => (
                  <Typography key={staff.staffId} gutterBottom>
                    {staff.nameEn}
                  </Typography>
                ))}
            </Grid>

            <Grid item xs={6}>
              <Typography>Time</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {responseFilm.data.filmLength} min
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Description</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {responseFilm.data.description
                  ? responseFilm.data.description
                  : '🚀 No description, just vibes'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography gutterBottom variant="h6">
            🎭 Starring:
          </Typography>

          {responseStaff.data
            .filter(el => el.professionKey === 'ACTOR')
            .slice(0, 10)
            .map(staff => (
              <Link
                key={staff.staffId}
                component={ReactRouter}
                to={`/actor/${staff.staffId}`}
                gutterBottom
              >
                {staff.nameEn}
              </Link>
            ))}
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Grid item xs={12}>
          <ButtonGroup variant="outlined" size="small">
            <Button
              target="_blank"
              href={responseFilm.data.webUrl}
              endIcon={<Language />}
            >
              Kinopoisk
            </Button>
            <Button
              target="_blank"
              href={`https://www.imdb.com/title/${responseFilm.data.imdbId}`}
              endIcon={<Movie />}
            >
              IMDB
            </Button>
          </ButtonGroup>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">Watch online</Typography>
          <VideoPlayer />
        </Grid>
      </Grid>

      <Stack alignItems="center">
        <Typography gutterBottom variant="h5">
          Sequels And Prequels
        </Typography>
        <Stack
          alignItems="center"
          flexWrap="wrap"
          justifyContent="center"
          direction="row"
          sx={{ gap: 2 }}
        >
          {responseSequelsAndPrequels.data &&
            responseSequelsAndPrequels.data.map(el => (
              <MovieCard reload key={el.filmId} movie={el} />
            ))}
        </Stack>
      </Stack>
    </>
  );
}
