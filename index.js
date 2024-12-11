const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello World!");
});

const messages = [];

app.get("/findMessages", (req, res) => {
  try {
    return res.status(200).json(messages);
  } catch (err) {
    console.error(`Error occurred in file: index, function: get -`, err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/message", (req, res) => {
  try {
    const { user, text } = req.body;
    if (!user || !text)
      return res.status(400).json({ error: "Please provide a valid input" });
    const message = { user, text, timestamp: new Date().toISOString() };
    messages.push(message);
    return res.status(200).json({ message });
  } catch (err) {
    console.error(`Error occurred in file: index, function: post -`, err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = { app, messages };
