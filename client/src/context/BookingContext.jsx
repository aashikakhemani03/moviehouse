import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedTheatre, setSelectedTheatre] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedShow, setSelectedShow] = useState("");

    const clearBooking = () => {
        setSelectedMovie(null);
        setSelectedTheatre("");
        setSelectedDate("");
        setSelectedShow("");
    };

    return (
        <BookingContext.Provider
            value={{
                selectedMovie,
                setSelectedMovie,

                selectedTheatre,
                setSelectedTheatre,

                selectedDate,
                setSelectedDate,

                selectedShow,
                setSelectedShow,

                clearBooking
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    return useContext(BookingContext);
};