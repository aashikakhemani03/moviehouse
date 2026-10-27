import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedMovie: null,
    selectedTheatre: "",
    selectedDate: "",
    selectedShow: "",
    selectedSeats: [],
    ticketPrice: 200,
    totalAmount: 0
};

const bookingSlice = createSlice({
    name: "booking",

    initialState,

    reducers: {

        setBookingMovie: (state, action) => {
            state.selectedMovie = action.payload;
        },

        setTheatre: (state, action) => {
            state.selectedTheatre = action.payload;
        },

        setDate: (state, action) => {
            state.selectedDate = action.payload;
        },

        setShow: (state, action) => {
            state.selectedShow = action.payload;
        },

        selectSeat: (state, action) => {

            const seat = action.payload;

            if (!state.selectedSeats.includes(seat)) {
                state.selectedSeats.push(seat);
            }

            state.totalAmount =
                state.selectedSeats.length * state.ticketPrice;
        },

        removeSeat: (state, action) => {

            state.selectedSeats =
                state.selectedSeats.filter(
                    (seat) => seat !== action.payload
                );

            state.totalAmount =
                state.selectedSeats.length * state.ticketPrice;
        },

        clearBooking: (state) => {

            state.selectedMovie = null;
            state.selectedTheatre = "";
            state.selectedDate = "";
            state.selectedShow = "";
            state.selectedSeats = [];
            state.totalAmount = 0;
        }
    }
});

export const {
    setBookingMovie,
    setTheatre,
    setDate,
    setShow,
    selectSeat,
    removeSeat,
    clearBooking
} = bookingSlice.actions;

export default bookingSlice.reducer;