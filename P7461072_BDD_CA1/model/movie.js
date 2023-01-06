// Module: IT8904 BDD
// Assignment 1 - CA1
// Student No: P7461072
// Student Name: ONG WEI CHUAN

// Filename: movie.js
// Directory: P7461072_BDD_CA1/model/
// This file is under the model layer and is focused in
// processing of data between Controller and Database
// Controller <--> Model (movie.js) <--> Database
// This file is to connect to mySQL and write fctions
// to query the database table and retrieve the results.

var db = require("./databaseConfig");

var movieDB = {
  // POST /movie - Add new movie
  addMovie: function (
    movie_name,
    movie_description,
    release_date,
    image_url,
    genre_id,
    active,
    callback
  ) {
    var dbConn = db.getConnection(); //get configuration settings of mySQL DB

    // Callback function to handle result from connection
    dbConn.connect(function (err) {
      // Error from connection detected
      if (err) {
        console.log("movie DB connect error msg: " + err);
        return callback(err, null);
      }
      // Successful connection, proceed to do the query
      else {
        console.log("Database Connected Successfully!");
        var sql =
          "insert into movie(movie_name,movie_description,release_date,image_url,genre_id,active) values(?,?,?,?,?,?)";
        dbConn.query(
          sql,
          [
            movie_name,
            movie_description,
            release_date,
            image_url,
            genre_id,
            active,
          ],
          function (err, results) {
            dbConn.end(); //End the connection
            console.log("movie sql error: " + err);
            console.log("movie sql results: " + JSON.stringify(results));

            return callback(err, results);
          }
        ); //dbConn.query
      }
    }); //dbConn.connect
  }, //addMovie

  // GET /movie?active=Y - Retrieve all active screening movies
  // (Can also set active=N to retrieve non-active movies)
  getActiveMovie: function (active, callback) {
    var dbConn = db.getConnection(); //get configuration settings of mySQL DB

    // Callback function to handle result from connection
    dbConn.connect(function (err) {
      // Error from connection detected
      if (err) {
        console.log("movie DB connect error msg: " + err);
        return callback(err, null);
      }
      // Successful connection, proceed to do the query
      else {
        console.log("Database Connected Successfully!");

        var sql = "select * from movie where active=?";
        // var sql = "select * from movie";
        dbConn.query(sql, [active], function (err, results) {
          dbConn.end(); //End the connection
          console.log("movie sql error: " + err);
          console.log("movie sql results: " + JSON.stringify(results));

          return callback(err, results);
        }); //dbConn.query
      }
    }); //dbConn.connect
  }, //getMovie?active=Y

  // GET /movie?substr=<pat>&genreid=<num> (user is to supply substring of movies and genreid)
  // Retrieve movies based on substring of movie name OR genre id,
  // sort in ascending release date
  getSortedMovie: function (substr, genre_id, callback) {
    var dbConn = db.getConnection(); //get configuration settings of mySQL DB

    // Callback function to handle result from connection
    dbConn.connect(function (err) {
      // Error from connection detected
      if (err) {
        console.log("movie DB connect error msg: " + err);
        return callback(err, null);
      }
      // Successful connection, proceed to do the query
      else {
        console.log("Database Connected Successfully!");

        // user provides both substr and genreid
        // if (substr !== undefined && genre_id !== undefined) {
        var sql =
          "select * from movie where movie_name like ? or genre_id=? order by release_date";
        dbConn.query(sql, [substr, genre_id], function (err, results) {
          dbConn.end(); //End the connection
          console.log("movie sql error: " + err);
          console.log("movie sql results: " + JSON.stringify(results));

          return callback(err, results);
        }); //dbConn.query
      }
    }); //dbConn.connect
  }, //getSortedMovie
}; //movieDB

module.exports = movieDB;
