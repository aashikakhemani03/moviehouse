const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                <h1 className="text-2xl font-bold">
                    Movie<span className="text-red-500">House</span>
                </h1>

                <div className="hidden gap-8 md:flex">

                    <a
                        href="#home"
                        className="text-gray-300 hover:text-white"
                    >
                        Home
                    </a>

                    <a
                        href="#movies"
                        className="text-gray-300 hover:text-white"
                    >
                        Movies
                    </a>

                    <a
                        href="#theatres"
                        className="text-gray-300 hover:text-white"
                    >
                        Theatres
                    </a>

                    <a
                        href="#bookings"
                        className="text-gray-300 hover:text-white"
                    >
                        My Bookings
                    </a>

                </div>

                <button className="rounded-lg bg-red-600 px-5 py-2 font-semibold hover:bg-red-700">
                    Login
                </button>

            </div>

        </nav>
    );
};

export default Navbar;

