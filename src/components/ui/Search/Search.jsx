import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import { useGetFilmsQuery } from '../../../services/kinopoiskApi';

export default function Search() {
  const { countries, gengreId, order, type, year, keyword, page } = useSelector(
    state => state.searchQuerySlice,
  );
  const { data, isLoading } = useGetFilmsQuery({
    countries,
    gengreId,
    order,
    type,
    year,
    keyword,
    page,
  });

  return (
    <Autocomplete
      sx={{ width: 300 }}
      freeSolo
      options={
        data
          ? data.items.map(option =>
              option.nameOriginal ? option.nameOriginal : option.nameRu,
            )
          : []
      }
      renderInput={params => <TextField {...params} label="freeSolo" />}
    />
  );
}
