import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setSearchQuery } from '../../../features/searchQuerySlice';
import { useGetFilmsQuery } from '../../../services/kinopoiskApi';

const movieTypes = {
  FILM: 'FILM',
  TV_SERIES: 'TV',
  TV_SHOW: 'SHOW',
  MINI_SERIES: 'LIMITED SERIES',
};

export default function Search() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { countries, gengreId, order, type, year, keyword, page } = useSelector(
    state => state.searchQuerySlice,
  );

  useEffect(() => {
    const setTimoutId = setTimeout(() => {
      dispatch(setSearchQuery({ keyword: input }));
    }, 500);

    return () => clearTimeout(setTimoutId);
  }, [input]);

  const { data, isFetching } = useGetFilmsQuery({
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
      sx={{
        width: 300,
        backgroundColor: 'rgba(255,255,255, 0.15)',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: 'none',
          },
        },
      }}
      freeSolo
      onInputChange={(_, value) => {
        setInput(value);
      }}
      getOptionLabel={option =>
        `${option.nameRu} - ${movieTypes[option.type]}- ${option.year}`
      }
      options={data ? data.items : []}
      onChange={(_, value) => {
        navigate(`/movie/${value.kinopoiskId}`);
      }}
      renderInput={params => (
        <TextField
          {...params}
          label="Search..."
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isFetching ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
