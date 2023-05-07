const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const ToDo = require("./Schemas/ToDo");
const cors = require("cors");

dotenv.config();

try {
  mongoose.connect("mongodb://127.0.0.1:27017/tododb", {
    useNewUrlParser: true,
  });
} catch (err) {
  console.log("connection to DB refused");
  console.log(err.message);
  process.on("SIGINT", async () => {
    await mongoose.disconnect();
    process.exit();
  });
}

const app = express();

app.use(express.json(), cors());

app.get("/active", async (req, res) => {
  // there is no request, so i just need to show the active todos from db
  try {
    const todos = await ToDo.getActive();
    res.json(todos);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/done", async (req, res) => {
  try {
    const todos = await ToDo.getDone();
    res.json(todos);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/trash", async (req, res) => {
  try {
    const todos = await ToDo.getTrash();
    res.json(todos);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/active", async (req, res) => {
  try {
    const todo = new ToDo({
      val: req.body.val,
      done: req.body.done,
      trash: req.body.trash,
    });
    todo.save();
    res.json(todo);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(process.env.PORT);
