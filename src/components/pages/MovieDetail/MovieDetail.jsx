import { ArrowBack } from '@mui/icons-material';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetFilmQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffQuery,
} from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage';

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
    <Grid container spacing={2}>
      <Grid item xs={3}>
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
      <Grid item xs={6}>
        <Grid container>
          <Grid xs={2}>
            <Button
              startIcon={<ArrowBack />}
              size="large"
              onClick={() => navigate(-1)}
            ></Button>
          </Grid>
          <Grid xs={10} alignContent="center">
            <Typography variant="h5">
              {responseFilm.data.nameOriginal
                ? responseFilm.data.nameOriginal
                : responseFilm.data.nameRu}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={6}>
            <Typography>Year</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography gutterBottom>{responseFilm.data.year}</Typography>
          </Grid>

          <Grid xs={6}>
            <Typography>Country</Typography>
          </Grid>
          <Grid xs={6}>
            {responseFilm.data.countries.map(({ country }) => (
              <Typography key={country} gutterBottom>
                {country}
              </Typography>
            ))}
          </Grid>

          <Grid xs={6}>
            <Typography>Genre</Typography>
          </Grid>
          <Grid xs={6}>
            {responseFilm.data.genres.map(({ genre }) => (
              <Typography key={genre} gutterBottom>
                {genre}
              </Typography>
            ))}
          </Grid>

          <Grid xs={6}>
            <Typography>Directors</Typography>
          </Grid>
          <Grid xs={6}>
            {responseStaff.data
              .filter(el => el.professionKey === 'DIRECTOR')
              .map(staff => (
                <Typography key={staff.staffId} gutterBottom>
                  {staff.nameEn}
                </Typography>
              ))}
          </Grid>

          <Grid xs={6}>
            <Typography>Time</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography gutterBottom>
              {responseFilm.data.filmLength} min
            </Typography>
          </Grid>

          <Grid xs={6}>
            <Typography>Description</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography gutterBottom>
              {responseFilm.data.description
                ? responseFilm.data.description
                : '🚀 No description, just vibes'}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Typography gutterBottom variant="h6">
          🎭 Starring:
        </Typography>

        {responseStaff.data
          .filter(el => el.professionKey === 'ACTOR')
          .slice(0, 10)
          .map(staff => (
            <Typography key={staff.staffId} gutterBottom>
              {staff.nameEn}
            </Typography>
          ))}
      </Grid>
    </Grid>
  );
}
