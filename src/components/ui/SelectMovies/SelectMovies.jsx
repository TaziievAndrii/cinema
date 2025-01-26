import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

import { resetQuery, selectQuery } from '../../../features/currentQuerySlice';

export default function SelectMovies({
  countries,
  order,
  year,
  genreId,
  countriesList,
  genresList,
}) {
  const dispatch = useDispatch();

  const ordersList = [
    { title: 'Sort by rating', value: 'RATING' },
    { title: 'Sort by scores ', value: 'NUM_VOTE' },
  ];

  const yearsList = new Array(60).fill(null).map((_, i) => ({
    title: new Date().getFullYear() - i,
    value: new Date().getFullYear() - i,
  }));

  return (
    <Stack
      sx={{ flexDirection: { sm: 'column', md: 'row' }, gap: 2, mt: 2, mb: 2 }}
    >
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Sorting</InputLabel>
        <Select
          value={order}
          onChange={e => {
            dispatch(selectQuery({ order: e.target.value }));
          }}
        >
          {ordersList.map(order => (
            <MenuItem key={order.value} value={order.value}>
              {order.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          value={countries}
          onChange={e => {
            dispatch(selectQuery({ countries: e.target.value }));
          }}
        >
          {countriesList.map(country => (
            <MenuItem key={country.id} value={country.id}>
              {country.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Gengre</InputLabel>
        <Select
          value={genreId}
          onChange={e => {
            dispatch(selectQuery({ genreId: e.target.value }));
          }}
        >
          {genresList.map(genre => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          value={year}
          onChange={e => {
            dispatch(selectQuery({ year: e.target.value }));
          }}
        >
          {yearsList.map(year => (
            <MenuItem key={year.value} value={year.value}>
              {year.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box>
        <Button
          onClick={() => dispatch(resetQuery())}
          variant="outlined"
          startIcon={<CloseIcon />}
        >
          Clear
        </Button>
      </Box>
    </Stack>
  );
}
