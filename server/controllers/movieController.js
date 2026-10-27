const Movie = require("../models/Movie");

// GET /api/movies
const getMovies = async (req, res) => {
    try {

        const movies = await Movie.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            count: movies.length,
            data: movies
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch movies",
            error: error.message
        });
    }
};


// GET /api/movies/:id
const getMovieById = async (req, res) => {
    try {

        const movie = await Movie.findById(
            req.params.id
        );

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });
        }

        res.status(200).json({
            success: true,
            data: movie
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch movie",
            error: error.message
        });
    }
};


// POST /api/movies
const createMovie = async (req, res) => {
    try {

        const movie = await Movie.create(req.body);

        res.status(201).json({
            success: true,
            message: "Movie created successfully",
            data: movie
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: "Failed to create movie",
            error: error.message
        });
    }
};


// PUT /api/movies/:id
const updateMovie = async (req, res) => {
    try {

        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Movie updated successfully",
            data: movie
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: "Failed to update movie",
            error: error.message
        });
    }
};


// DELETE /api/movies/:id
const deleteMovie = async (req, res) => {
    try {

        const movie = await Movie.findByIdAndDelete(
            req.params.id
        );

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Movie deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to delete movie",
            error: error.message
        });
    }
};


module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};