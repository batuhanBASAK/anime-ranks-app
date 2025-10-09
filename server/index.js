require("dotenv").config(); // Load .env variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Connect the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB is connected successfully"))
  .catch((err) => console.error(err.message));

// Routers

// for authentication
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);
// for api (getting information about an anime, and etc. )
const apiRouter = require("./routes/api");
app.use("/api", apiRouter);
// for user related stuff
const userRouter = require("./routes/user");
app.use("/user", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
