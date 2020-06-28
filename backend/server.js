const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const converterRoutes = express.Router();
const PORT = 4000;

let Converter = require("./converter.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

converterRoutes.route("/").get(function (req, res) {
  Converter.find(function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

converterRoutes.route("/add").post(function (req, res) {
  let converter = new Converter(req.body);
  converter
    .save()
    .then((converter) => {
      res.status(200).json({ converter: "converter added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new converter failed");
    });
});

app.use("/converter", converterRoutes);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
