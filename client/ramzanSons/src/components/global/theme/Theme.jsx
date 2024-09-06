import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: localStorage.getItem('theme') || 'light', // Initialize with the value from localStorage
    reducers: {
        toggleTheme: (state) => {
            const newTheme = state === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return newTheme; // Return the updated state
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
