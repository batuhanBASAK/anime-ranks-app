require("dotenv").config();
const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { verifyRefreshToken } = require("../middlewares/authMiddleware");
const {
  generateRefreshToken,
  generateAccessToken,
  deleteRefreshToken,
} = require("../utils/tokenUtils");
const router = express.Router();

// sign up
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      return res
        .status(400)
        .json({ message: "User with this email has already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    return res
      .status(200)
      .json({ message: "New user has been registered successfully!" });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  const userDoc = await User.findOne({ email });
  if (!userDoc) {
    return res.status(400).json({ message: "There is no such user!" });
  }

  try {
    const passwordHashed = userDoc.password;
    const isPasswordCorrect = await bcrypt.compare(password, passwordHashed);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const refreshToken = await generateRefreshToken(userDoc);
    const accessToken = generateAccessToken(userDoc);

    // Set refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: process.env.REFRESH_TOKEN_EXPIRATION_TIME_IN_MS,
    });

    return res.status(200).json({
      accessToken: accessToken,
      message: "Logged in successfully",
    });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
});

// refresh
router.post("/refresh", verifyRefreshToken, async (req, res) => {
  const userID = req.userID;
  const userDoc = await User.findById(userID);
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res
      .status(400)
      .json({ message: "cannot get refreshToken from cookies" });
  }

  if (!userDoc) {
    return res.status(400).json({ message: "There is no such user!" });
  }

  try {
    const accessToken = generateAccessToken(userDoc);
    const newRefreshToken = await generateRefreshToken(userDoc);
    await deleteRefreshToken(refreshToken);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: process.env.REFRESH_TOKEN_EXPIRATION_TIME_IN_MS,
    });
    return res.status(200).json({
      accessToken: accessToken,
      message: "New access token generated successfully",
    });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
});

// logout

module.exports = router;
