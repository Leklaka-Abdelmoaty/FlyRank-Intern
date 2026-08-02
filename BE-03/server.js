import express from "express";
import {
  initializeDatabase,
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "./db.js";

const app = express();
const PORT = 3000;

app.use(express.json());

await initializeDatabase();

// GET /tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /tasks/:id
app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /tasks
app.post("/tasks", async (req, res) => {
  try {
    const { title, done = false } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        error: "Title is required",
      });
    }

    const newTask = await createTask(title, done);

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /tasks/:id
app.put("/tasks/:id", async (req, res) => {
  try {
    const { title, done } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        error: "Title is required",
      });
    }

    const updatedTask = await updateTask(
      req.params.id,
      title,
      done
    );

    if (!updatedTask) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /tasks/:id
app.delete("/tasks/:id", async (req, res) => {
  try {
    const deletedTask = await deleteTask(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});