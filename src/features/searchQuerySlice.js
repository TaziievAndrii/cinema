import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: '',
  gengreId: '',
  order: 'NUM_VOTE',
  type: '',
  year: '',
  page: 1,
  keyword: '',
};

export const searchQuerySlice = createSlice({
  name: 'searchQuerySlice',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

// Action creators are generated for each case reducer function
export const { setSearchQuery } = searchQuerySlice.actions;

export default searchQuerySlice.reducer;
