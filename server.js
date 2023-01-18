import cors from "cors";
import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/tweetDB");

const tweetSchema = {
  tweet: String,
};

const Tweet = new mongoose.model("Tweet", tweetSchema);

app.get("/", (req, res) => {
  Tweet.find({}, (err, tweets) => {
    if (err) throw err;
    res.json(tweets.reverse());
  });
});

app.post("/", (req, res) => {
  const { tweet } = req.body;
  const newTweet = new Tweet({ tweet: tweet });
  newTweet.save();
  res.status(200).json("Success");
});

app.delete("/delete", (req, res) => {
  const { id } = req.body;
  // console.log(id);
  Tweet.findByIdAndRemove(id, (err) => {
    if (err) throw err;
    res.status(200).json("Deleted");
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running fine");
});
