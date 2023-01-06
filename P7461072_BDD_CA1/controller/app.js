// Module: IT8904 BDD
// Assignment 1 - CA1
// Student No: P7461072
// Student Name: ONG WEI CHUAN

// Filename: app.js
// Directory: P7461072_BDD_CA1/controller/
// This file is under the controller layer
// Browser(View) <--> Controller <--> Model
// This file is to provide the web service to communicate
// with the browser (client)

// References
// 1. en.wikipedia.org/wiki/Film_genre
// 2. https://www.rottentomatoes.com/

https: var express = require("express");
var bodyParser = require("body-parser");
var user = require("../model/user");
var movie = require("../model/movie");
var genre = require("../model/genre");

var app = express(); //start express server

// POST/PUT/DELETE methods require body-parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser); //attach body-parser middleware
app.use(bodyParser.json()); //parse json data

// To verify admin's credentials using email and password
// Once valid email and password are found in the database,
// the role of this login person must be an admin
// POST /login - To validate login by admin
app.post("/login", function (req, res) {
  var email = req.body.email; //get email
  var password = req.body.password; //get password

  console.log("body.email = " + email);
  console.log("body.password = " + password);

  user.loginUser(email, password, function (err, results) {
    // Error handling 1: If server error
    if (err) {
      res.status(500);
      res.type("json");
      res.send(`{"Message":"Login failed"}`);
    }

    // Error handling 2: If no record found for email/password entered (results is empty array [])
    else if (results.length == 0) {
      res.status(404);
      res.type("json");
      res.send(`{"Message":"Login email or password incorrect"}`);
    }

    // Error handling 3: if email/password record is found but role is not admin
    else if (results[0].role !== "admin") {
      res.status(401);
      res.type("json");
      res.send(`{"Message":"Login failed as user is not an admin"}`);
    }

    // Login success as valid email/password is entered and is an admin
    else {
      res.status(200);
      res.type("json");
      // res.send(results);
      res.send(`{"Message":"Login is successful!"}`);
    }
  }); //user.loginUser
});

// POST /genre - Add new genre record
app.post("/genre", function (req, res) {
  var genre_name = req.body.genre_name;
  var genre_description = req.body.genre_description;

  genre.addGenre(genre_name, genre_description, function (err, results) {
    // Error handling
    if (err) {
      res.status(500);
      res.type("json");
      res.send(`{"Message":"Add new genre failed"}`);
    }

    // If no error
    else {
      res.status(200);
      res.type("json");
      res.send(`{"Message":"New Genre Added: ${genre_name}"}`);
    }
  });
});

// POST /movie - Add new movie record
app.post("/movie", function (req, res) {
  var movie_name = req.body.movie_name;
  var movie_description = req.body.movie_description;
  var release_date = req.body.release_date;
  var image_url = req.body.image_url;
  var genre_id = req.body.genre_id;
  var active = req.body.active;

  movie.addMovie(
    movie_name,
    movie_description,
    release_date,
    image_url,
    genre_id,
    active,
    function (err, results) {
      // Error handling
      if (err) {
        res.status(500);
        res.type("json");
        res.send(`{"Message":"Add new movie failed"}`);
      }
      // If no error
      else {
        res.status(200);
        res.type("json");
        res.send(`{"Message":"New Movie Added: ${movie_name}"}`);
      }
    }
  );
});

// GET /genre - Retrieve all genre
app.get("/genre", function (req, res) {
  genre.getGenre(function (err, results) {
    // Error handling
    if (err) {
      res.status(500);
      res.type("json");
      res.send(`{"Message":"Get all genre failed"}`);
    }

    // If no error
    else {
      res.status(200);
      res.type("json");
      res.send(results);
    }
  });
});

// GET active movies or movies with substring & filter by genre
app.get("/movie", function (req, res) {
  console.log(req.url);
  console.log(req.method);
  console.log(req.path);
  console.log(req.query.active);
  console.log(req.query.substr);
  console.log(req.query.genreid);
  var active = req.query.active; //get active query
  var substr = "%" + req.query.substr + "%"; //get substr query
  var genreid = req.query.genreid; //get genreid query

  // GET /movie?active=Y - Retrieve all active screening movies
  if (active) {
    movie.getActiveMovie(active, function (err, results) {
      // Error handling
      if (err) {
        res.status(500);
        res.type("json");
        res.send(`{"Message":"Get active screening movies failed"}`);
      }

      // If no error
      else {
        res.status(200);
        res.type("json");
        res.send(results);
      }
    }); //movie.getActiveMovie
  }

  // GET /movie?substr=<pat>&genreid=<num>
  // Retrieve movies based on substring of movie name or genre id
  else {
    movie.getSortedMovie(substr, genreid, function (err, results) {
      // Error handling
      if (err) {
        res.status(500);
        res.type("json");
        res.send(`{"Message":"Get sorted list of movies failed"}`);
      }
      // If no error
      else {
        res.status(200);
        res.type("json");
        res.send(results);
      }
    });
  } //movie.getSortedMovie
});

module.exports = app;
