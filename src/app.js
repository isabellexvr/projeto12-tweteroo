import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];
const completeTweets = [];

app.post("/sign-up", (req, res) => {
  const newUser = req.body;
  if (!newUser.username || !newUser.avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  users.push(newUser);
  res.send("OK");
  console.log(users);
});

app.post("/tweets", (req, res) => {
  const newTweet = req.body;
  const user = req.headers.user;

  if (!newTweet.tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }
  tweets.push(newTweet);

  users.forEach((u) => {
    if (user === u.username) {
      const newCompleteTweet = {
        username: u.username,
        avatar: u.avatar,
        tweet: newTweet.tweet,
      };
      completeTweets.push(newCompleteTweet);
    }
  });
  res.status(201).send("OK");
  console.log(newTweet);
});

app.get("/tweets", (req, res) => {
  const tenLast = completeTweets.slice(-10);
  res.send(tenLast);
  console.log(tenLast);
});

app.get("/tweets/:username", (req, res) => {
  const user = req.params.username;
  const userTweets = completeTweets.filter((t) => {
    if (user === t.username) {
      return t;
    }
  });
  res.send(userTweets);
});

app.listen(5000, () => {
  console.log("App running in port: 5000");
});
