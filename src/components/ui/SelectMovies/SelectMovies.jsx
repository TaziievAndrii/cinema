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

export default function SelectMovies({
  countries,
  order,
  year,
  genreId,
  countriesList,
  genresList,
}) {
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
        <Select>
          {ordersList.map(order => (
            <MenuItem key={order.value} value={order.value}>
              {order.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select>
          {countriesList.map(country => (
            <MenuItem key={country.id} value={country.id}>
              {country.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Gengre</InputLabel>
        <Select>
          {genresList.map(genre => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select>
          {yearsList.map(year => (
            <MenuItem key={year.value} value={year.value}>
              {year.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box>
        <Button variant="outlined" startIcon={<CloseIcon />}>
          Clear
        </Button>
      </Box>
    </Stack>
  );
}
