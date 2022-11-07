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
});

app.get("/tweets", (req, res) => {
  const { page } = req.query;
  if (page < 1) {
    res.status(400).send("Informe uma página válida!");
    return;
  }
  if (page > 1 && completeTweets.length >= 10) {
    const lastNine = completeTweets.slice(
      (page - 1) * 10 + 1,
      completeTweets.length
    );
    console.log((page - 1) * 10 + 1);
    res.send(lastNine);
    return;
  }
  if (page > 1 && completeTweets.length < 10) {
    return;
  }
  if (page == 1) {
    res.send(completeTweets.slice(-10));
    return;
  }
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
