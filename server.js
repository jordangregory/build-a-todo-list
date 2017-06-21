const express = require("express");
const bodyParser = require("body-parser");
const mustacheExpress = require("mustache-express");
const port = process.env.PORT || 3000;
const app = express();

app.engine("mustache", mustacheExpress());
app.set("views", "./public");
app.set("view engine", "mustache");

const todos = [
  "Learn to be a programmer",
  "Don't suck at front-end",
  "Don't suck at back-end",
  "Get a job",
  "Get money"
];
//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));

//ROUTES

app.use("/", express.static("./public")); //Used to "serve them up" for other files such as CSS or another JS

app.get("/", function(req, res) {
  //Requests the data from the server to be rendered for this "path/"
  res.render("todos", { todos: todos });
});

app.post("/", function(req, res) {
  //Sending data to the server, runs through middleware first, and then server interprets the data and then does whatever you tell it to do
  todos.push(req.body.searchInput); //Take this data and push it to my array
  res.redirect("/");
});

app.listen(port, function() {
  //This is where the browser listens
  console.log("Server is running on port: " + port);
});
