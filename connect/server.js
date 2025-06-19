const connect = require("connect");
const http = require("http");
const fs = require("fs");

const app = connect();

app.use((req, res, next) => {
  const now = new Date().toISOString();
  const logline = `${now} ${req.method} ${req.url}\n`;

  fs.appendFile("log.data", logline, (err) => {
    if (err) console.log("error", err);
  });
  next();
});

app.use("/echo", (req, res, next) => {
  if (req.method === "POST") {
    res.end(new Date().toString());
  } else {
    next();
  }
});

app.use("/about", (req, res, next) => {
  if (req.method === "GET") {
    res.end("About Page");
  } else {
    next();
  }
});

app.use("/htmlfile", (req, res, next) => {
  if (req.method === "GET") {
    fs.readFile("./public/file.html", "utf8", (err, data) => {
      if (err) return res.end("Error reading html file");
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(data);
    });
  } else {
    next();
  }
});

app.use("/image", (req, res) => {
  if (req.method === "GET") {
    fs.readFile("./public/cat.png", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Image not found");
      } else {
        res.writeHead(200, { "Content-Type": "image/png" });
        res.end(data);
      }
    });
  } else {
    next();
  }
});

app.use("/", (req, res, next) => {
  if (req.method === "GET" && req.url === "/") {
    res.end("Home Page");
  } else {
    next();
  }
});

app.use((req, res) => {
  res.writeHead(404);
  res.end("404 NOT FOUND");
});

http.createServer(app).listen(3000, () => {
  console.log("server is running on port 3000");
});
