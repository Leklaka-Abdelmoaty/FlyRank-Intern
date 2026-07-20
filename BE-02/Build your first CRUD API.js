const express = require('express')
const app = express();
const port = 3000;
app.use(express.json());

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
  if (!list || list.length === 0) {
    return res.status(404).send({ error : "No tasks found" });
  }
  else {
  res.status(200).json(list);
}
});

app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = list.find(task => task.id === taskId);
  if (!task) {
    return res.status(404).send({ error: `Task ${taskId} not found` });
  }
  res.status(200).json(task);
});
