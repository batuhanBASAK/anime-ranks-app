const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    RatedAnimes: {
      type: [
        {
          animeID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Anime",
            required: true,
          },
          rating: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
          },
        },
      ],
      default: [], // starts as empty list
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
