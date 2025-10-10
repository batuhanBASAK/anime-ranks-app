require("dotenv").config();
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION_TIME = process.env.ACCESS_TOKEN_EXPIRATION_TIME;
const REFRESH_TOKEN_EXPIRATION_TIME = process.env.REFRESH_TOKEN_EXPIRATION_TIME;
const REFRESH_TOKEN_EXPIRATION_TIME_IN_MS =
  process.env.REFRESH_TOKEN_EXPIRATION_TIME_IN_MS;

function generateAccessToken(user) {
  return jwt.sign({ user: user._id, role: user.role }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
  });
}

// new refreshTokens,
// adds the new generated token to database
// and returns the new refresh token.
async function generateRefreshToken(user) {
  // 1. Create JWT refresh token (valid for 7 days)
  const refreshToken = jwt.sign(
    { user: user._id, role: user.role },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    }
  );

  // 2. Save it to the database with TTL
  const expiresAt = new Date(
    Date.now() + parseInt(REFRESH_TOKEN_EXPIRATION_TIME_IN_MS)
  );

  await RefreshToken.create({
    token: refreshToken,
    expiresAt: expiresAt,
  });

  // 3. Return the raw token
  return refreshToken;
}

// Deletes refresh token from database
async function deleteRefreshToken(refreshToken) {
  try {
    await RefreshToken.deleteOne({ token: refreshToken });
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  deleteRefreshToken,
};
