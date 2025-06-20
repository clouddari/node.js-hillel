require("dotenv").config();

const express = require("express");
const app = express();

const port = process.env.PORT || 3100;

app.get("/", (req, res) => {
  res.send("home");
});

app.get("/json", (req, res) => {
  res.json({
    title: "express",
    success: 1,
  });
});

app.get("/redirect", (req, res) => {
  res.redirect("/json");
});

app.get("/goods/:id", (req, res) => {
  res.json({
    url: "goods",
    id: req.params.id,
  });
});

app.get("/q", (req, res) => {
  res.json(req.query);
});

app.get("/random", (req, res) => {
  const min = Number(req.query.min);
  const max = Number(req.query.max);

  if (isNaN(min) || isNaN(max)) {
    return res.status(400).json({ error: "Invalid min or max value" });
  }

  const random = Math.trunc(Math.random() * (max - min) + min);

  res.json({ min, max, random });
});

app.use((req, res, next) => {
  res.status(404).send("not found");
});

app.listen(port, () => {
  console.log("server is listening at http://localhost:" + port);
});
