import MovieCard from "./MovieCard";

const MovieList = ({
    movies,
    onBook,
    searchQuery,
    setSearchQuery,
    loading
}) => {

    return (
        <section
            id="movies"
            className="bg-slate-950 px-6 py-20"
        >

            <div className="mx-auto max-w-7xl">

                <div className="mb-8">

                    <p className="font-semibold uppercase tracking-widest text-red-500">
                        Now Showing
                    </p>

                    <h2 className="mt-2 text-4xl font-bold">
                        Movies
                    </h2>

                    <p className="mt-3 text-gray-400">
                        Search and select a movie to book tickets.
                    </p>

                </div>

                {/* Search */}
                <div className="mb-10 max-w-xl">

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) =>
                            setSearchQuery(e.target.value)
                        }
                        placeholder="Search movies..."
                        className="w-full rounded-xl border border-white/10 bg-slate-900 px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:border-red-500"
                    />

                </div>

                {/* Loading */}
                {loading && (
                    <p className="text-gray-400">
                        Loading movies...
                    </p>
                )}

                {/* Movies */}
                {!loading && movies.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onBook={onBook}
                            />
                        ))}

                    </div>
                )}

                {/* No results */}
                {!loading && movies.length === 0 && (
                    <div className="rounded-xl border border-white/10 bg-slate-900 p-10 text-center">

                        <h3 className="text-xl font-semibold">
                            No movies found
                        </h3>

                        <p className="mt-2 text-gray-400">
                            Try searching for another movie.
                        </p>

                    </div>
                )}

            </div>

        </section>
    );
};

export default MovieList;