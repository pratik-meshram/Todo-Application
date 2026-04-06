const Todo = require("../Models/todoSchema.js");

const createTodoData = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
  });
  //

  try {
    const newTodo = await todo.save();
    res.status(201).json({ mes: "todo created", newTodo });
    console.log("data is sucessfully submitted in mongoDb", newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mes: "error adding todo data" });
  }
};

const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json({
      message: "Todo fetching successfully",
      todo: todos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in fetching todo data",
    });
  }
};

const UpdateTodo = async (req, res) => {
  try {
    const todosUpdateData = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    return res.status(200).json({
      message: "Todo updated successfully",
      todo: todosUpdateData,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ mes: "error in Updating todo data" });
  }
};

const deleteTodos = async (req, res) => {
  try {
    const todosDeleteData = await Todo.findByIdAndDelete(req.params.id, {
      new: true,
    });
    if (!todosDeleteData) {
      res.status(404).json({ mes: "todos Data Not found" });
    }

    res.status(201).json({ message: "todo Updated Sucessfully..." }, todosDeleteData);
    console.log("todos data ", todosDeleteData);
  } catch (error) {
    console.log(error);
    res.status(404).json({ mes: "error in Deleting todo data" });
  }
};

module.exports = { createTodoData, getTodo, UpdateTodo, deleteTodos };
