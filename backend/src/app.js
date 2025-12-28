const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");
const foodRoutes = require("./routes/food.route");
const cors = require("cors");

const allowedOrigins = ["http://localhost:5173"];

const app = express();
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like mobile apps or curl
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

module.exports = app;