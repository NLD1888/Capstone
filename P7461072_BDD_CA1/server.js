// Module: IT8904 BDD
// Assignment 1 - CA1
// Student No: P7461072
// Student Name: ONG WEI CHUAN

// Filename: server.js
// Directory: P7461072_BDD_CA1/
// This file is in the root directory managing the start-up of the server

var app = require("./controller/app");

var hostname = "localhost";
var port = 8081;

app.listen(port, hostname, function () {
  console.log(`Web Server hosted at http://${hostname}:${port}`);
});
