const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


const generateToken = (user) => {

    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:
                process.env.JWT_EXPIRES_IN || "1d"
        }
    );
};


// ===============================
// REGISTER
// ===============================

const register = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;


        const existingUser =
            await User.findOne({ email });


        if (existingUser) {

            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }


        const hashedPassword =
            await bcrypt.hash(password, 10);


        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user"
        });


        const token =
            generateToken(user);


        res.status(201).json({

            success: true,

            message:
                "Registration successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: "Registration failed",
            error: error.message
        });
    }
};


// ===============================
// LOGIN
// ===============================

const login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        const user =
            await User.findOne({ email });


        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }


        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }


        const token =
            generateToken(user);


        res.status(200).json({

            success: true,

            message:
                "Login successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
};


module.exports = {
    register,
    login
};