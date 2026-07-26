const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

// Point to your existing tasks.db inside the 'db' directory
const dbPath = path.join(__dirname, '..', 'db', 'tasks.db');
const db = new Database(dbPath);

const app = express();
const port = 3000;

app.use(express.json());

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => { res.status(200).json({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] }) })

app.get("/health", (req, res) => {
  res.status(200).json({ "status": "ok" });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});


let list = [{ id: 1, title: "task1", done: true }
  , { id: 2, title: "task2", done: false }
  , { id: 3, title: "task3", done: true }]

app.get("/tasks", (req, res) => {
  const countStmt = db.prepare('SELECT COUNT(*) AS count FROM tasks');
  const { count } = countStmt.get();
  if (count === 0) {
    return res.status(404).send({ error : "No tasks found" });
  }
  else {
  const selectStmt = db.prepare('SELECT * FROM tasks');
  taskList = selectStmt.all();
  res.status(200).json(taskList);
}
});



app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const selectStmt = db.prepare('SELECT * FROM tasks WHERE id = ?');
  const task = selectStmt.get(taskId);
 
  if (!task) {
    return res.status(404).send({ error: `Task ${taskId} not found` });
  }
  res.status(200).json(task);
});

app.post("/tasks", (req, res) => {
  const task = req.body;
  if (!task || !task.title || task.title.trim() === "") {
    return res.status(400).send({ error: "Title is required" });
  }

 
  const insertStmt = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');
  const result = insertStmt.run(task.title, task.done ? 1 : 0);
  const newTask = {
    id: result.lastInsertRowid,
    title: task.title,
    done: task.done
  };
 
  return res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const task = req.body;
  const taskId = parseInt(req.params.id);

  const updateStmt = db.prepare('UPDATE tasks SET title = ?, done = ? WHERE id = ?');
  const result = updateStmt.run(task.title, task.done ? 1 : 0, taskId);

  if (result.changes === 0) {
    return res.status(404).send({ error: `Task ${taskId} not found` });
  }
  if (!task || !task.title || task.title.trim() === "") {
    return res.status(400).send({ error: "Bad Request" });
  }
  if (typeof task.done !== "boolean") {
    return res.status(400).send({ error: "Bad Request" });
  }
  else {
    const selectStmt = db.prepare('SELECT * FROM tasks WHERE id = ?');
    const task = selectStmt.get(taskId);
    return res.status(200).json(task);

  }
});


app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const deleteStmt = db.prepare('DELETE FROM tasks WHERE id = ?');
    const result = deleteStmt.run(taskId);

    if (result.changes === 0) {
        return res.status(404).send({ error: `Task ${taskId} not found` });
    }

    // list.splice(taskIndex, 1);

    return res.status(204).end();
});

app.get("/stats", (req, res) => {
  const totalTasks = list.length;
  const completedTasks = list.filter(task => task.done).length;
  const pendingTasks = totalTasks - completedTasks;
  res.status(200).json({ "total":totalTasks, "done":completedTasks, "pending":pendingTasks });
});