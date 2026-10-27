const Hero = () => {
    return (
        <section
            id="home"
            className="bg-slate-950 px-6 py-24 md:py-32"
        >

            <div className="mx-auto max-w-7xl">

                <p className="mb-4 font-semibold uppercase tracking-widest text-red-500">
                    Movie Ticket Booking
                </p>

                <h1 className="max-w-4xl text-5xl font-extrabold leading-tight md:text-7xl">
                    Your movie night
                    <span className="text-red-500"> starts here.</span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
                    Discover movies, choose your theatre, select your
                    favourite seats and book your tickets in seconds.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">

                    <a
                        href="#movies"
                        className="rounded-lg bg-red-600 px-6 py-3 font-semibold hover:bg-red-700"
                    >
                        Browse Movies
                    </a>

                    <button className="rounded-lg border border-white/20 px-6 py-3 font-semibold hover:bg-white/10">
                        Select City
                    </button>

                </div>

            </div>

        </section>
    );
};

export default Hero;