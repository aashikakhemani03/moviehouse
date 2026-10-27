const Navbar = ({ currentUser, onLogin, onSignup, onSignOut }) => {
    return (
        <nav className="site-nav">
            <div className="nav-inner">
                <a className="brand-lockup" href="#home" aria-label="MovieHouse home">
                    Movie<span>House</span>
                    <i aria-hidden="true">®</i>
                </a>

                <div className="nav-links">
                    <a href="#home">Discover</a>
                    <a href="#movies">Now showing</a>
                    <a href="#theatres">Theatres</a>
                </div>

                <div className="nav-account">
                    {currentUser ? (
                        <>
                            <span className="nav-greeting">Hi, {currentUser.name || "there"}</span>
                            <button className="nav-signin" onClick={onSignOut} type="button">Sign out</button>
                        </>
                    ) : (
                        <>
                            <button className="nav-login" onClick={onLogin} type="button">Sign in</button>
                            <button className="nav-signin" onClick={onSignup} type="button">Join MovieHouse <span aria-hidden="true">↗</span></button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

