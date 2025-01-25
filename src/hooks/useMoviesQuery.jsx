import React from 'react';
import { useSelector } from 'react-redux';

import { TOP_LISTS } from '../constants';
import { useGetFilmsTopQuery,useGetFilmsQuery } from '../services/kinopoiskApi';

export default function useMoviesQuery() {
  const { page } = useSelector(state => state.currentQuerySlice);
  const responsePopular = useGetFilmsTopQuery({
    type: TOP_LISTS[0].value,
    page,
  });

  const responseBest = useGetFilmsTopQuery({
    type: TOP_LISTS[1].value,
    page,
  });

  const responseFilms = useGetFilmsQuery({
    
  });

  const responseSerial;

  const responseCartoons;
  
    const isLoading = 
    responsePopular.isFetching || 
    responseBest.isFetching || 
    responseFilms.isFetching || 
    responseSerial.isFetching || 
    responseCartoons.isFetching;
  
    const hasError = 
    responsePopular.error || 
    responseBest.error || 
    responseFilms.error || 
    responseSerial.error || 
    responseCartoons.error;
  
  
  
  return {
    hasError,
    isLoading,
    responsePopular,
    responseBest,
    responseFilms,
    responseSerial,
    responseCartoons
  };
}
