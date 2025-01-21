import { Box, Link, Rating, Stack, Tooltip } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import styles from './MovieCard.module.css';

export default function MovieCard({ movie }) {
  return (
    <Stack>
      <RouterLink to={`/movie/${movie.kinopoiskId}`}>
        <img
          src={movie.posterUrlPreview}
          alt={movie.nameOriginal}
          className={styles.img}
        />
      </RouterLink>
      <Link
        to={`/movie/${movie.kinopoiskId}`}
        component={RouterLink}
        textAlign="center"
        sx={{ width: '200px' }}
      >
        {movie.nameOriginal ? movie.nameOriginal : movie.nameRu}
      </Link>

      {movie.ratingKinopoisk && (
        <Stack alignItems="center">
          <Tooltip title={`${movie.ratingKinopoisk} / 10`}>
            <Box>
              <Rating
                name="read-only"
                value={movie.ratingKinopoisk / 2}
                readOnly
                precision={0.1}
              />
            </Box>
          </Tooltip>
        </Stack>
      )}
    </Stack>
  );
}
