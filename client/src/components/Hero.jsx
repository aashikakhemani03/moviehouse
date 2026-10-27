const Hero = ({ featuredMovie, onBook }) => {
    return (
        <section
            id="home"
            className="hero-section"
            style={{ "--hero-image": `url("${featuredMovie?.image || ""}")` }}
        >
            <div className="hero-copy">
                <p className="eyebrow hero-eyebrow"><span /> A little more cinema in your life</p>
                <h1>Make tonight<br />a <em>movie night.</em></h1>
                <p className="hero-description">
                    Find the film you’ll be talking about tomorrow. Choose a theatre and showtime, and let the outside world wait.
                </p>
                <div className="hero-actions">
                    <a className="button-primary" href="#movies">Explore films <span aria-hidden="true">↓</span></a>
                    {featuredMovie && (
                        <button className="button-quiet" onClick={() => onBook(featuredMovie)} type="button">
                            Featured: {featuredMovie.title} <span aria-hidden="true">↗</span>
                        </button>
                    )}
                </div>
                <div className="hero-meta">
                    <span>01 — 12</span>
                    <span>Curated for the big screen</span>
                </div>
            </div>
            <div className="hero-side-note" aria-hidden="true">
                <span>NOW SHOWING</span>
                <span>{featuredMovie?.title || "MovieHouse"}</span>
            </div>
        </section>
    );
};

export default Hero;