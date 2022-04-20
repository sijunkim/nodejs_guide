// const express = require("express");
// const app = express();
// const port = process.env.PORT || 3000;

// const indexRouter = require("./router/indexRouter");

// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//   });
// });
// app.use("/index", indexRouter);

// const server = app.listen(port, () => {
//   console.log(`server on ${port}`);
// });

const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
  fs.readFile("./html/server.html", (err, data) => {
    if (err) {
      throw err;
    }
    res.end(data);
  });
}).listen(8081, () => {
  console.log("8081번 포트에서 서버 대기 중입니다!");
});