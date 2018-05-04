const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const controller = require("./controller");
var http = require("http");

const app = express();

app.use(bodyparser.json());

mongoose.connect("//YOUR DATABASE CONNECTION");
app.use(
  session({
    secret: "supersecretstring12345!",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60000 * 30 }
    // store: new MongoStore({ mongooseConnection: mongoose.connection }) //not neccesary
  })
);

app.use(
  cors({
    //tis adds session to req, like so: req.session
    origin: ["https://reddit-t.firebaseapp.com", "http://localhost:3000"],
    methods: ["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: true //allow setting of cookies
  })
);

setInterval(function() {
  http.get("http://redditbackend.herokuapp.com");
  console.log("okay");
}, 300000);

controller(app);

app.listen(process.env.PORT || 8000, () => {
  console.log("Listening...");
});
