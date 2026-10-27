import { useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({
    movies,
    onBook,
    searchQuery,
    setSearchQuery,
    loading
}) => {
    const [selectedGenre, setSelectedGenre] = useState("All films");
    const genres = ["All films", ...new Set(movies.map((movie) => movie.genre))];
    const searchedMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const visibleMovies = selectedGenre === "All films"
        ? searchedMovies
        : searchedMovies.filter((movie) => movie.genre === selectedGenre);

    return (
        <section
            id="movies"
            className="movie-section"
        >
            <div className="movie-inner">
                <div className="movie-heading">
                    <div>
                        <p className="eyebrow">A picture-house edit</p>
                        <h2>Now showing<span>.</span></h2>
                        <p>Find your next favorite from this week’s lineup.</p>
                    </div>
                    <span className="movie-count">{visibleMovies.length.toString().padStart(2, "0")} FILMS</span>
                </div>

                <div className="movie-tools">
                    <label className="movie-search">
                        <span className="search-glyph" aria-hidden="true">⌕</span>
                        <span className="sr-only">Search films</span>
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Search by title..."
                        />
                    </label>
                    <div className="genre-rail" aria-label="Filter by genre">
                        {genres.map((genre) => (
                            <button
                                aria-pressed={selectedGenre === genre}
                                className={selectedGenre === genre ? "active" : ""}
                                key={genre}
                                onClick={() => setSelectedGenre(genre)}
                                type="button"
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                </div>

                {loading && (
                    <p className="movie-empty">Loading the lineup…</p>
                )}

                {!loading && visibleMovies.length > 0 && (
                    <div className="movie-grid">
                        {visibleMovies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} onBook={onBook} />
                        ))}
                    </div>
                )}

                {!loading && visibleMovies.length === 0 && (
                    <div className="movie-empty">
                        <h3>No films found.</h3>
                        <p>Try another title or genre.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MovieList;