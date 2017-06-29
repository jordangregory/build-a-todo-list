const express = require("express");
const bodyParser = require("body-parser");
const mustacheExpress = require("mustache-express");
const models = require("./models");
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

// query data base through todos model and get all todo record
// render the todos page with the found todos
app.get("/", function(req, res) {
  models.todos.findAll().then(function(todos) {
    res.render("todos", {
      todos: todos
    });
  });
});

app.post("/", function(req, res) {
  var todo = req.body.searchInput;
  var newTodo = models.todos.build({ chore: todo });
  newTodo
    .save()
    .then(function(saved) {
      todos.push(req.body.searchInput); //Take this data and push it to my array
      res.redirect("/");
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

app.get("/todos/:id", function(req, res) {
  models.todos
    .findById(req.params.id)
    .then(function(foundUser) {
      res.send(foundUser);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

app.delete("/todos/:id", function(req, res) {
  models.todos
    .destroy({ where: { id: req.params.id } })
    .then(function(deletedUser) {
      res.send(deletedUser);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

app.listen(port, function() {
  //This is where the browser listens
  console.log("Server is running on port: " + port);
});
