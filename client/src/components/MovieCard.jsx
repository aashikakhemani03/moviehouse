const MovieCard = ({ movie, onBook }) => {
    return (
        <div className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900">

            <div className="relative aspect-[2/3] overflow-hidden">

                <img
                    src={movie.image}
                    alt={movie.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute right-3 top-3 rounded-lg bg-black/80 px-3 py-1 text-yellow-400">
                    ★ {movie.rating}
                </div>

            </div>

            <div className="p-5">

                <h3 className="text-xl font-bold">
                    {movie.title}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                    {movie.genre} • {movie.language}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                    {movie.duration} • {movie.certificate}
                </p>

                <button
                    onClick={() => onBook(movie)}
                    className="mt-5 w-full rounded-lg bg-red-600 py-3 font-semibold hover:bg-red-700"
                >
                    Book Tickets
                </button>

            </div>

        </div>
    );
};

export default MovieCard;