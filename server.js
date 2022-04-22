// const http = require("http");
// const fs = require("fs");

// http.createServer((req, res) => {
//   fs.readFile("./html/server.html", (err, data) => {
//     if (err) {
//       throw err;
//     }
//     res.end(data);
//   });
// }).listen(8081, () => {
//   console.log("8081번 포트에서 서버 대기 중입니다!");
// });

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디 : ${process.pid}`);

  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
  });
} else {
  // 워커들이 포트에서 대기
  http.createServer((req, res) => {
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Cluster!</p>');
  }).listen(8085); console.log(`${process.pid}번 워커 실행`);
}