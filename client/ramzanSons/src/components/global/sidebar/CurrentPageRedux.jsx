import { createSlice } from '@reduxjs/toolkit';

const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState: 'Home',
  reducers: {
    setCurrentPage: (state, action) => action.payload,
  },
});

export const { setCurrentPage } = currentPageSlice.actions;
export default currentPageSlice.reducer;
