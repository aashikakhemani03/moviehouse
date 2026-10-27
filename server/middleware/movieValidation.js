const { body, validationResult } = require("express-validator");

const validateMovie = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Movie title is required"),

    body("genre")
        .trim()
        .notEmpty()
        .withMessage("Genre is required"),

    body("year")
        .optional()
        .isInt({
            min: 1888,
            max: 2100
        })
        .withMessage("Year must be a valid number"),

    body("rating")
        .isFloat({
            min: 0,
            max: 10
        })
        .withMessage("Rating must be between 0 and 10"),

    body("image")
        .trim()
        .notEmpty()
        .withMessage("Movie image is required"),

    body("description")
        .optional()
        .trim(),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array()
            });
        }

        next();
    }
];

module.exports = {
    validateMovie
};