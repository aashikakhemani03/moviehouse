import { useEffect, useMemo, useState } from "react";

import moviesData from "../data/movies";
import useDebounce from "./useDebounce";

const useMovies = () => {

    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    const debouncedSearch = useDebounce(searchQuery, 500);

    useEffect(() => {

        const loadMovies = () => {

            setLoading(true);

            setTimeout(() => {
                setMovies(moviesData);
                setLoading(false);
            }, 300);

        };

        loadMovies();

    }, []);

    const filteredMovies = useMemo(() => {

        if (!debouncedSearch.trim()) {
            return movies;
        }

        return movies.filter((movie) =>
            movie.title
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase())
        );

    }, [movies, debouncedSearch]);

    return {
        movies: filteredMovies,
        searchQuery,
        setSearchQuery,
        loading
    };
};

export default useMovies;