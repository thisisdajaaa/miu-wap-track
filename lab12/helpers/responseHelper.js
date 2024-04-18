const fs = require("fs");
const path = require("path");

const { STATUS_CODES } = require("../constants");

const handleResponse = (res) => (directory, fileName, contentType) => {
  const filePath = path.join(__dirname, directory, fileName);
  const fileInfo = fs.statSync(filePath);
  const readable = fs.createReadStream(filePath);

  readable.pipe(res);

  res.writeHead(STATUS_CODES.OK, {
    "Content-Type": contentType,
    "Content-Length": fileInfo.size,
  });

  res.on("close", () => readable.destroy());
};

module.exports = { handleResponse };
