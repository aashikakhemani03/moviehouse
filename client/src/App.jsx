
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieList from "./components/MovieList";
import BookingModal from "./components/BookingModal";

import socket from "./services/socket";

import {
    setSearchQuery,
    setSelectedMovie
} from "./store/slices/movieSlice";

function App() {
    const dispatch = useDispatch();

    const [showBookingModal, setShowBookingModal] =
        useState(false);

    const movies = useSelector(
        (state) => state.movies.movies
    );

    const searchQuery = useSelector(
        (state) => state.movies.searchQuery
    );

    const loading = useSelector(
        (state) => state.movies.loading
    );

    const selectedMovie = useSelector(
        (state) => state.movies.selectedMovie
    );

    const filteredMovies = movies.filter((movie) =>
        movie.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    // Set page title
    useEffect(() => {
        document.title = "MovieHouse - Movie Ticket Booking";
    }, []);

    // Socket.IO connection and real-time booking updates
    useEffect(() => {
        const handleConnect = () => {
            console.log(
                "Connected to Socket.IO:",
                socket.id
            );
        };

        const handleBookingUpdate = (bookingData) => {
            console.log(
                "Real-time booking update:",
                bookingData
            );
        };

        socket.on("connect", handleConnect);
        socket.on("bookingUpdate", handleBookingUpdate);

        // Handle an already-established connection
        if (socket.connected) {
            handleConnect();
        }

        return () => {
            socket.off("connect", handleConnect);
            socket.off(
                "bookingUpdate",
                handleBookingUpdate
            );
        };
    }, []);

    // Search movies
    const handleSearch = (value) => {
        dispatch(setSearchQuery(value));
    };

    // Open booking modal
    const handleBook = (movie) => {
        dispatch(setSelectedMovie(movie));
        setShowBookingModal(true);
    };

    // Close booking modal
    const closeModal = () => {
        setShowBookingModal(false);
    };

    // Temporary test for Experiment 8
    const testBooking = () => {
        const bookingData = {
            movie: "Interstellar",
            seats: ["A1", "A2"],
            user: "Test User"
        };

        socket.emit("movieBooked", bookingData);
    };

    return (
        <div className="min-h-screen bg-slate-950">

            <Navbar />

            <main>
                <Hero />

                <MovieList
                    movies={filteredMovies}
                    onBook={handleBook}
                    searchQuery={searchQuery}
                    setSearchQuery={handleSearch}
                    loading={loading}
                />

                <section
                    id="theatres"
                    className="bg-slate-900 px-6 py-20"
                >
                    <div className="mx-auto max-w-7xl text-center">

                        <p className="font-semibold uppercase tracking-widest text-red-500">
                            Find a Theatre
                        </p>

                        <h2 className="mt-2 text-4xl font-bold">
                            Watch movies near you
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                            Choose your theatre, show time and
                            seats to complete your booking.
                        </p>

                    </div>
                </section>
            </main>

            {/* Temporary Experiment 8 test button */}
            <div className="bg-slate-950 px-6 py-6 text-center">
                <button
                    type="button"
                    onClick={testBooking}
                    className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                    Test Real-Time Booking
                </button>
            </div>

            {showBookingModal && selectedMovie && (
                <BookingModal
                    movie={selectedMovie}
                    onClose={closeModal}
                />
            )}

        </div>
    );
}

export default App;
