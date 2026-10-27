import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    setBookingMovie,
    setTheatre,
    setDate,
    setShow
} from "../store/slices/bookingSlice";
import {
    getBookingDateWindow,
    isDateWithinBookingWindow
} from "../utils/bookingDate";

const BookingModal = ({ movie, onClose, onConfirmed }) => {

    const dispatch = useDispatch();
    const [dateError, setDateError] = useState("");
    const [confirmed, setConfirmed] = useState(false);

    const {
        selectedTheatre,
        selectedDate,
        selectedShow
    } = useSelector(
        (state) => state.booking
    );

    const { min, max } = getBookingDateWindow();
    const dateIsValid = isDateWithinBookingWindow(selectedDate);

    const theatres = [
        "PVR Cinemas",
        "INOX",
        "Cinepolis"
    ];

    const showTimes = [
        "10:00 AM",
        "1:30 PM",
        "4:30 PM",
        "7:30 PM",
        "10:00 PM"
    ];

    useEffect(() => {
        dispatch(setBookingMovie(movie));
    }, [dispatch, movie]);

    const handleTheatre = (value) => {
        dispatch(setTheatre(value));
    };

    const handleDate = (value) => {
        if (value && !isDateWithinBookingWindow(value)) {
            setDateError(`Choose a date between ${min} and ${max}.`);
            return;
        }

        setDateError("");
        dispatch(setDate(value));
    };

    const handleShow = (value) => {
        dispatch(setShow(value));
    };

    const handleConfirm = () => {
        if (dateError || !isDateWithinBookingWindow(selectedDate)) {
            setDateError(`Choose a date between ${min} and ${max}.`);
            return;
        }

        onConfirmed?.({
            movie: movie.title,
            theatre: selectedTheatre,
            date: selectedDate,
            show: selectedShow
        });
        setConfirmed(true);
    };

    return (
        <div className="booking-backdrop" onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
        }}>
            <section aria-labelledby="booking-title" aria-modal="true" className="booking-panel" role="dialog">

                <div className="booking-heading">

                    <div>

                        <p className="eyebrow">
                            {confirmed ? "Your screening" : "A night at the movies"}
                        </p>

                        <h2 id="booking-title" className="booking-title">
                            {movie.title}
                        </h2>

                    </div>

                    <button
                        aria-label="Close booking"
                        type="button"
                        onClick={onClose}
                        className="booking-close"
                    >
                        ×
                    </button>

                </div>

                {confirmed ? (
                    <div className="booking-confirmation">
                        <span className="confirmation-mark" aria-hidden="true">✓</span>
                        <h3>Your show is selected.</h3>
                        <p>{selectedTheatre} · {selectedDate} · {selectedShow}</p>
                        <p className="confirmation-note">Your selection is ready. Seat selection can be added to your next booking step.</p>
                        <button className="booking-primary" onClick={onClose} type="button">
                            Back to movies
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="booking-movie-summary">
                            <img src={movie.image} alt="" />
                            <div>
                                <span>{movie.genre} · {movie.duration}</span>
                                <p>{movie.description}</p>
                            </div>
                        </div>

                        <div className="booking-field">
                            <label htmlFor="booking-theatre">Theatre</label>
                            <select
                                id="booking-theatre"
                                value={selectedTheatre}
                                onChange={(event) => handleTheatre(event.target.value)}
                            >
                                <option value="">Choose a theatre</option>
                                {theatres.map((theatre) => (
                                    <option key={theatre} value={theatre}>{theatre}</option>
                                ))}
                            </select>
                        </div>

                        <div className="booking-field">
                            <label htmlFor="booking-date">Date</label>
                            <input
                                id="booking-date"
                                type="date"
                                min={min}
                                max={max}
                                value={selectedDate}
                                aria-invalid={Boolean(dateError) || (Boolean(selectedDate) && !dateIsValid)}
                                aria-describedby="booking-date-hint"
                                onChange={(event) => handleDate(event.target.value)}
                            />
                            <span id="booking-date-hint" className="booking-hint">
                                Available {min} through {max}
                            </span>
                            {dateError && <span className="booking-error" role="alert">{dateError}</span>}
                            {!dateError && selectedDate && !dateIsValid && (
                                <span className="booking-error" role="alert">This date is outside the booking window.</span>
                            )}
                        </div>

                        <fieldset className="booking-field">
                            <legend>Show time</legend>
                            <div className="showtime-grid">
                                {showTimes.map((time) => (
                                    <button
                                        key={time}
                                        aria-pressed={selectedShow === time}
                                        className={selectedShow === time ? "selected" : ""}
                                        onClick={() => handleShow(time)}
                                        type="button"
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        <button
                            disabled={!selectedTheatre || !dateIsValid || !selectedShow || Boolean(dateError)}
                            className="booking-primary"
                            onClick={handleConfirm}
                            type="button"
                        >
                            Confirm show selection <span aria-hidden="true">→</span>
                        </button>
                    </>
                )}

            </section>

        </div>
    );
};

export default BookingModal;