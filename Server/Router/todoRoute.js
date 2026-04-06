const express = require("express");
const { createTodoData, getTodo, UpdateTodo , deleteTodos } = require("../Controller/todoController.js");

const router = express.Router();

router.post("/create", createTodoData);
router.get("/fetch", getTodo);
router.put("/update/:id", UpdateTodo);
router.delete("/delete/:id", deleteTodos);

module.exports = router;