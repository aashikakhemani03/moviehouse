import { createSlice } from "@reduxjs/toolkit";

import moviesData from "../../data/movies";

const initialState = {
    movies: moviesData,
    selectedMovie: null,
    searchQuery: "",
    loading: false,
    error: null
};

const movieSlice = createSlice({
    name: "movies",

    initialState,

    reducers: {

        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload;
        },

        clearSelectedMovie: (state) => {
            state.selectedMovie = null;
        },

        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {
    setSelectedMovie,
    clearSelectedMovie,
    setSearchQuery,
    setLoading,
    setError
} = movieSlice.actions;

export default movieSlice.reducer;