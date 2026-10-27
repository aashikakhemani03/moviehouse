import { useDispatch, useSelector } from "react-redux";

import {
    setBookingMovie,
    setTheatre,
    setDate,
    setShow
} from "../store/slices/bookingSlice";

const BookingModal = ({ movie, onClose }) => {

    const dispatch = useDispatch();

    const {
        selectedTheatre,
        selectedDate,
        selectedShow
    } = useSelector(
        (state) => state.booking
    );

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

    const handleMovie = () => {
        dispatch(setBookingMovie(movie));
    };

    const handleTheatre = (value) => {
        dispatch(setTheatre(value));
    };

    const handleDate = (value) => {
        dispatch(setDate(value));
    };

    const handleShow = (value) => {
        dispatch(setShow(value));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">

            <div className="w-full max-w-lg rounded-2xl bg-slate-900 p-6">

                <div className="flex justify-between">

                    <div>

                        <p className="text-sm text-red-500">
                            Book Tickets
                        </p>

                        <h2 className="mt-1 text-2xl font-bold">
                            {movie.title}
                        </h2>

                    </div>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-400 hover:text-white"
                    >
                        ×
                    </button>

                </div>

                <button
                    onClick={handleMovie}
                    className="mt-4 rounded-lg border border-red-500 px-4 py-2 text-sm"
                >
                    Select {movie.title}
                </button>

                {/* Theatre */}

                <div className="mt-6">

                    <label className="mb-2 block text-sm text-gray-400">
                        Theatre
                    </label>

                    <select
                        value={selectedTheatre}
                        onChange={(e) =>
                            handleTheatre(e.target.value)
                        }
                        className="w-full rounded-lg bg-slate-800 p-3"
                    >

                        <option value="">
                            Select Theatre
                        </option>

                        {theatres.map((theatre) => (
                            <option
                                key={theatre}
                                value={theatre}
                            >
                                {theatre}
                            </option>
                        ))}

                    </select>

                </div>

                {/* Date */}

                <div className="mt-6">

                    <label className="mb-2 block text-sm text-gray-400">
                        Date
                    </label>

                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) =>
                            handleDate(e.target.value)
                        }
                        className="w-full rounded-lg bg-slate-800 p-3"
                    />

                </div>

                {/* Show */}

                <div className="mt-6">

                    <label className="mb-3 block text-sm text-gray-400">
                        Show Time
                    </label>

                    <div className="grid grid-cols-2 gap-3">

                        {showTimes.map((time) => (

                            <button
                                key={time}
                                onClick={() =>
                                    handleShow(time)
                                }
                                className={`rounded-lg border p-3 ${
                                    selectedShow === time
                                        ? "border-red-500 bg-red-600"
                                        : "border-white/10 bg-slate-800"
                                }`}
                            >
                                {time}
                            </button>

                        ))}

                    </div>

                </div>

                <button
                    disabled={
                        !selectedTheatre ||
                        !selectedDate ||
                        !selectedShow
                    }
                    className="mt-8 w-full rounded-lg bg-red-600 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Continue to Seat Selection
                </button>

            </div>

        </div>
    );
};

export default BookingModal;