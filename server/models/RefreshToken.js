const mongoose = require("mongoose");

const RefreshTokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: [true, "Username is required"],
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 }, // TTL index
  },
});

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
module.exports = RefreshToken;
