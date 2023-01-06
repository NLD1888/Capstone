// Module: IT8904 BDD
// Assignment 1 - CA1
// Student No: P7461072
// Student Name: ONG WEI CHUAN

// Filename: databaseConfig.js
// Directory: P7461072_BDD_CA1/model/
// This file is under the model layer and is focused in
// processing of data between Controller and Database
// Controller <--> Model (databaseConfig.js) <--> Database
// This file is for connection to mySQL database (movie schema)

// Load mysql library
var mysql = require("mysql");

// Create a function for database connection since below connection settings
// will be used frequently
var dbconnect = {
  getConnection: function () {
    // Define the connection settings for mysql database
    var conn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Bdd#326435",
      database: "ca1_sp_movie",
    });
    return conn;
  }, //getConnection function
};

module.exports = dbconnect;
