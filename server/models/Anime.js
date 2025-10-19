const mongoose = require("mongoose");

const animeSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  slug: {
    type: String,
    required: [true, "Slug is required"],
  },
  overallRating: {
    type: Number,
    default: 0.0,
  },
  rank: {
    type: Number,
  },
  totalRates: {
    type: Number,
    default: 0,
  },
  ratings: {
    1: {
      Users: {
        type: [mongoose.Schema.Types.ObjectId], // list of user ids
        ref: "User",
        default: [],
      },
      totalNumber: { type: Number, default: 0 },
    },
    2: {
      Users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
      },
      totalNumber: { type: Number, default: 0 },
    },
    3: {
      Users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
      },
      totalNumber: { type: Number, default: 0 },
    },
    4: {
      Users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
      },
      totalNumber: { type: Number, default: 0 },
    },
    5: {
      Users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
      },
      totalNumber: { type: Number, default: 0 },
    },
    6: {
      Users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
      },
      totalNumber: { type: Number, default: 0 },
    },
    7: {
      Users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
      },
      totalNumber: { type: Number, default: 0 },
    },
    8: {
      Users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
      },
      totalNumber: { type: Number, default: 0 },
    },
    9: {
      Users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
      },
      totalNumber: { type: Number, default: 0 },
    },
    10: {
      Users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
      },
      totalNumber: { type: Number, default: 0 },
    },
  },
});

// Pre-save hook to set rank automatically
animeSchema.pre("save", async function (next) {
  if (!this.rank) {
    try {
      const count = await mongoose.model("Anime").countDocuments();
      this.rank = count + 1;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const Anime = mongoose.model("Anime", animeSchema);

module.exports = Anime;
