const Anime = require("../models/Anime");
const User = require("../models/User");

// Updates the rank of the given anime in database
async function updateRanking(animeID, newRank) {
  // Fetch all animes sorted by overallRating descending
  const allAnimes = await Anime.find().sort({ overallRating: -1 });

  for (let i = 0; i < allAnimes.length; i++) {
    const anime = allAnimes[i];
    const newRank = i + 1; // rank starts at 1

    // Only update if rank changed
    if (anime.rank !== newRank) {
      anime.rank = newRank;
      await anime.save(); // save updated rank
    }
  }
}

// Add new rating for the given user to given anime
async function addRating(animeID, userID, rating) {
  if (rating < 1 || rating > 10)
    throw new Error("Rating must be between 1 and 10");

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const anime = await Anime.findById(animeID).session(session);
    if (!anime) throw new Error("Anime not found");

    const user = await User.findById(userID).session(session);
    if (!user) throw new Error("User not found");

    // ----- Update user's RatedAnimes -----
    user.RatedAnimes.push({ animeID, rating });

    // ----- Update anime ratings -----
    anime.ratings[rating].Users.push(userID);
    anime.ratings[rating].totalNumber += 1;

    // Save both documents
    await user.save({ session });
    await anime.save({ session });

    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
}

// Updates rating of anime given by user with given newRating.
async function updateRating(animeID, userID, newRating) {
  if (newRating < 1 || newRating > 10)
    throw new Error("Rating must be between 1 and 10");

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find anime and user inside the session
    const anime = await Anime.findById(animeID).session(session);
    if (!anime) throw new Error("Anime not found");

    const user = await User.findById(userID).session(session);
    if (!user) throw new Error("User not found");

    // ----- Update user's RatedAnimes -----
    const ratingEntry = user.RatedAnimes.find(
      (r) => r.animeID.toString() === animeID
    );
    if (!ratingEntry) throw new Error("User hasn't rated this anime yet");

    const oldRating = ratingEntry.rating;
    ratingEntry.rating = newRating;

    // ----- Update anime ratings -----
    // Remove user from old rating
    anime.ratings[oldRating].Users = anime.ratings[oldRating].Users.filter(
      (id) => id.toString() !== userID
    );
    anime.ratings[oldRating].totalNumber -= 1;

    // Add user to new rating
    anime.ratings[newRating].Users.push(userID);
    anime.ratings[newRating].totalNumber += 1;

    // Save both documents inside the transaction
    await user.save({ session });
    await anime.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return { user, anime };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
}

// Update overall rating of given anime
async function updateOverallRating(animeID) {
  try {
    const anime = await Anime.findById(animeID);
    if (!anime) throw new Error("Anime not found");

    let totalScore = 0;
    let totalVotes = 0;

    // Loop through ratings 1 to 10
    for (let i = 1; i <= 10; i++) {
      const ratingData = anime.ratings[i];
      if (ratingData) {
        totalScore += i * ratingData.totalNumber;
        totalVotes += ratingData.totalNumber;
      }
    }

    // Calculate overall rating
    anime.overallRating =
      totalVotes === 0 ? 0 : +(totalScore / totalVotes).toFixed(2); // 2 decimal places
    await anime.save();

    return anime.overallRating;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  updateRanking,
  addRating,
  updateRating,
  updateOverallRating,
};
