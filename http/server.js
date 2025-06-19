const port = 3000;
const http = require("http");
const fs = require("fs");

const server = http.createServer(serverFunction);

function serverFunction(req, res) {
  console.log(req.method);
  console.log(req.url);

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Home page");
  } else if (req.method === "GET" && req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("About page");
  } else if (req.method === "POST" && req.url === "/echo") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(new Date().toString());
  } else if (req.method === "GET" && req.url === "/htmlfile") {
    fs.readFile("./public/file.html", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Error loading html file :(");
      } else {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(data);
      }
    });
  } else if (req.method === "GET" && req.url === "/image") {
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
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404 Not Found");
  }
}

server.listen(port, function (error) {
  if (error) {
    console.log("something went wrong", error);
  } else {
    console.log("server is listening on port", port);
  }
});
