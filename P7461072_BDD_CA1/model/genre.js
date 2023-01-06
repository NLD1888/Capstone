// Module: IT8904 BDD
// Assignment 1 - CA1
// Student No: P7461072
// Student Name: ONG WEI CHUAN

// Filename: genre.js
// Directory: P7461072_BDD_CA1/model/
// This file is under the model layer and is focused in
// processing of data between Controller and Database
// Controller <--> Model (genre.js) <--> Database
// This file is to connect to mySQL and write fctions
// to query the database table and retrieve the results.

var db = require("./databaseConfig");

var genreDB = {
  // POST /genre - Add new genre
  addGenre: function (genre_name, genre_description, callback) {
    var dbConn = db.getConnection(); //get configuration settings of mySQL DB

    // Callback function to handle result from connection
    dbConn.connect(function (err) {
      // Error from connection detected
      if (err) {
        console.log("genre DB connect error msg: " + err);
        return callback(err, null);
      }
      // Successful connection, proceed to do the query
      else {
        console.log("Database Connected Successfully!");

        var sql = "insert into genre(genre_name,genre_description) values(?,?)";
        dbConn.query(
          sql,
          [genre_name, genre_description],
          function (err, results) {
            dbConn.end(); //End the connection
            console.log("genre sql error: " + err);
            console.log("genre sql results: " + JSON.stringify(results));

            return callback(err, results);
          }
        ); //dbConn.query
      }
    }); //dbConn.connect
  }, //addGenre

  // GET /genre - Retrieve all genre
  getGenre: function (callback) {
    var dbConn = db.getConnection(); //get configuration settings of mySQL DB

    // Callback function to handle result from connection
    dbConn.connect(function (err) {
      // Error from connection detected
      if (err) {
        console.log("genre DB connect error msg: " + err);
        return callback(err, null);
      }
      // Successful connection, proceed to do the query
      else {
        console.log("Database Connected Successfully!");

        var sql = "select * from genre";
        dbConn.query(
          sql,
          [],
          function (err, results) {
            dbConn.end(); //End the connection
            console.log("genre sql error: " + err);
            console.log("genre sql results: " + JSON.stringify(results));

            return callback(err, results);
          }
        ); //dbConn.query
      }
    }); //dbConn.connect
  }, //getGenre
}; //genreDB

module.exports = genreDB;
