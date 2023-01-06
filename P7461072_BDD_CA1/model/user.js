// Module: IT8904 BDD
// Assignment 1 - CA1
// Student No: P7461072
// Student Name: ONG WEI CHUAN

// Filename: user.js
// Directory: P7461072_BDD_CA1/model/
// This file is under the model layer and is focused in
// processing of data between Controller and Database
// Controller <--> Model (user.js) <--> Database
// This file is to connect to mySQL and write fctions
// to query the database table and retrieve the results.

var db = require("./databaseConfig");

var userDB = {
  // POST /login - Login by admin
  loginUser: function (email, password, callback) {
    var dbConn = db.getConnection(); //get configuration settings of mySQL DB

    // Callback function to handle result from connection
    dbConn.connect(function (err) {
      // Error from connection detected
      if (err) {
        console.log("user DB connect error msg: " + err);
        return callback(err, null);
      }
      // Successful connection, proceed to do the query
      else {
        console.log("Database Connected Successfully!");
        var sql = "select * from user where email=? and password=?";
        dbConn.query(sql, [email, password], function (err, results) {
          dbConn.end(); //End the connection
          console.log("user sql error: " + err);
          console.log("user sql results: " + JSON.stringify(results));

          return callback(err, results);
        }); //dbConn.query
      }
    }); //dbConn.connect
  }, //loginUser
}; //userDB

module.exports = userDB;
