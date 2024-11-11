import express from "express";
import { saveTask } from "./saveData.js";
import db from "../dataBase/dataBaseConnection.js";

const router = express.Router();
// CRUD
router.post("/add", async (req, res) => {
  const { description, date } = req.body;
  console.log("Request body:", req.body);

  try {
    const newTask = await saveTask(description, date);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to save task" });
  }
});

router.post("/edit", async (req, res) => {
  const { id, description, date } = req.body;

  try {
    await db.query(
      "UPDATE tasks SET description = $1, date = $2 WHERE id = $3",
      [description, date, id]
    );
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(500).json({ error: "Failed to edit task" });
  }
});

router.get("/myTask", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tasks ORDER BY date DESC");
    console.log("Fetched tasks:", result.rows);
    res.json(result.rows); 
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

router.delete("/delete-task/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.status(200).json({ message: `Task with ID ${id} has been deleted` });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

router.delete("/delete-all-tasks", async (req, res) => {
  try {
    await db.query("DELETE FROM tasks");
    res.status(200).json({ message: "All tasks have been deleted" });
  } catch (error) {
    console.error("Error deleting all tasks:", error.message);
    res.status(500).json({ error: "Failed to delete all tasks" });
  }
});

export default router;
