
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieList from "./components/MovieList";
import BookingModal from "./components/BookingModal";
import AuthModal from "./components/AuthModal";

import socket from "./services/socket";

import {
    setSearchQuery,
    setSelectedMovie
} from "./store/slices/movieSlice";

function App() {
    const dispatch = useDispatch();

    const [showBookingModal, setShowBookingModal] =
        useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState("login");
    const [toast, setToast] = useState("");
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            return JSON.parse(sessionStorage.getItem("moviehouse.user")) ?? null;
        } catch {
            return null;
        }
    });

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

    const featuredMovie = movies.find((movie) => movie.id === 5) ?? movies[0];

    // Set page title
    useEffect(() => {
        document.title = "MovieHouse - Movie Ticket Booking";
    }, []);

    useEffect(() => {
        if (!toast) return undefined;

        const timer = window.setTimeout(() => setToast(""), 4200);
        return () => window.clearTimeout(timer);
    }, [toast]);

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

    const openAuth = (mode) => {
        setAuthMode(mode);
        setShowAuthModal(true);
    };

    const handleAuthenticated = (result) => {
        if (result.token) sessionStorage.setItem("moviehouse.token", result.token);
        if (result.user) sessionStorage.setItem("moviehouse.user", JSON.stringify(result.user));
        setCurrentUser(result.user ?? null);
        setShowAuthModal(false);
        setToast(`Welcome${result.user?.name ? `, ${result.user.name}` : " back"}.`);
    };

    const handleSignOut = () => {
        sessionStorage.removeItem("moviehouse.token");
        sessionStorage.removeItem("moviehouse.user");
        setCurrentUser(null);
        setToast("You have signed out.");
    };

    const handleBookingConfirmed = (booking) => {
        socket.emit("movieBooked", {
            ...booking,
            user: currentUser?.name || "Guest"
        });
        setToast(`${booking.movie} · ${booking.date} selected.`);
    };

    return (
        <div className="app-shell">
            <Navbar
                currentUser={currentUser}
                onLogin={() => openAuth("login")}
                onSignup={() => openAuth("signup")}
                onSignOut={handleSignOut}
            />

            <main>
                <Hero featuredMovie={featuredMovie} onBook={handleBook} />

                <MovieList
                    movies={movies}
                    onBook={handleBook}
                    searchQuery={searchQuery}
                    setSearchQuery={handleSearch}
                    loading={loading}
                />

                <section
                    id="theatres"
                    className="theatre-section"
                >
                    <div className="theatre-inner">
                        <div>
                            <p className="eyebrow">A better kind of night out</p>
                            <h2>Make room for the big screen.</h2>
                            <p>Choose your theatre, find a showtime, and settle in. Your next favorite scene is closer than you think.</p>
                        </div>
                        <a href="#movies" className="theatre-link">Explore what’s showing <span aria-hidden="true">↗</span></a>
                    </div>
                </section>
            </main>

            <footer className="site-footer">
                <a className="brand-lockup" href="#home">Movie<span>House</span></a>
                <p>Made for the love of the big screen.</p>
                <a href="#home">Back to top ↑</a>
            </footer>

            {toast && <div className="toast-message" role="status">{toast}</div>}

            {showBookingModal && selectedMovie && (
                <BookingModal
                    movie={selectedMovie}
                    onClose={closeModal}
                    onConfirmed={handleBookingConfirmed}
                />
            )}

            {showAuthModal && (
                <AuthModal
                    initialMode={authMode}
                    backdropImage={featuredMovie?.image}
                    onClose={() => setShowAuthModal(false)}
                    onAuthenticated={handleAuthenticated}
                />
            )}

        </div>
    );
}

export default App;
