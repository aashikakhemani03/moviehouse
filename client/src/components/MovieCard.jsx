const MovieCard = ({ movie, onBook }) => {
    return (
        <article className="film-card">
            <div className="film-poster">
                <img
                    src={movie.image}
                    alt={movie.title}
                    loading="lazy"
                />
                <span className="film-rating"><span aria-hidden="true">★</span> {movie.rating.toFixed(1)}</span>
                <span className="film-poster-caption">NOW SHOWING</span>
            </div>
            <div className="film-details">
                <div className="film-title-row">
                    <h3>{movie.title}</h3>
                    <span>{movie.genre}</span>
                </div>
                <p className="film-meta">{movie.language} <i /> {movie.duration} <i /> {movie.certificate}</p>
                <p className="film-description">{movie.description}</p>
                <button
                    onClick={() => onBook(movie)}
                    className="film-book"
                    type="button"
                >
                    Book tickets <span aria-hidden="true">↗</span>
                </button>
            </div>
        </article>
    );
};

export default MovieCard;