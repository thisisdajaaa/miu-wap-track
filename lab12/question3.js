const http = require("http");

const { handleResponse } = require("./helpers/responseHelper");
const { HOST_NAME, PORT, STATUS_CODES } = require("./constants");

const server = http.createServer((req, res) => {
  if (req.method !== "GET") {
    res.writeHead(STATUS_CODES.BAD_REQUEST);
    res.end("Error! Only GET requests are supported as of the moment.");
    return;
  }

  switch (req.url) {
    case "/":
    case "/home":
      res.writeHead(STATUS_CODES.OK, { "Content-Type": "text/plain" });
      res.end("Welcome to my website");
      break;

    case "/image":
      handleResponse(res)("../assets/images", "dog.jpg", "image/jpeg");
      break;

    case "/pdf":
      handleResponse(res)("../assets/files", "sample.pdf", "application/pdf");
      break;

    case "/about":
      handleResponse(res)("../assets/files", "sample.txt", "text/plain");
      break;

    default:
      res.writeHead(STATUS_CODES.NOT_FOUND);
      res.end("Error! Endpoint not found.");
      break;
  }
});

server.listen(PORT, HOST_NAME, () => {
  console.log(`Server running at http://${HOST_NAME}:${PORT}/`);
});
