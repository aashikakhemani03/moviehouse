const express = require("express");

const {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
} = require("../controllers/movieController");

const {
    validateMovie
} = require("../middleware/movieValidation");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

const router = express.Router();


// Public routes

router.get("/", getMovies);

router.get("/:id", getMovieById);


// Admin-only routes

router.post(
    "/",
    protect,
    adminOnly,
    validateMovie,
    createMovie
);

router.put(
    "/:id",
    protect,
    adminOnly,
    validateMovie,
    updateMovie
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteMovie
);


module.exports = router;