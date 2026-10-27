
const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");

// Load environment variables
dotenv.config();

const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const corsOptions = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Origin not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"]
};

// Create Express application and HTTP server
const app = express();
const server = http.createServer(app);

// Configure Socket.IO
const io = new Server(server, {
    cors: corsOptions
});

// ===============================
// DATABASE
// ===============================
connectDB();

// ===============================
// SECURITY
// ===============================
app.use(helmet());

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }
});

app.use("/api", apiLimiter);

// ===============================
// CORS
// ===============================
app.use(cors(corsOptions));

// ===============================
// BODY PARSER
// ===============================
app.use(express.json());

// ===============================
// SOCKET.IO EVENTS
// ===============================
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("movieBooked", (bookingData) => {
        console.log("New booking received:", bookingData);

        // Broadcast the booking update to connected clients
        io.emit("bookingUpdate", bookingData);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// ===============================
// HEALTH CHECK
// ===============================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "MovieHouse API is running"
    });
});

// ===============================
// ROUTES
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

// ===============================
// 404 HANDLER
// ===============================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// ===============================
// GLOBAL ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal server error"
    });
});

// ===============================
// START HTTP + SOCKET.IO SERVER
// ===============================
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
