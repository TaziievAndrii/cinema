import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: '',
  gengreId: '',
  order: 'NUM_VOTE',
  type: '',
  year: '',
  page: 1,
};

export const currentQuerySlice = createSlice({
  name: 'currentQuerySlice',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
// export const {} = currentQuerySlice.actions;

export default currentQuerySlice.reducer;
