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

app.post("/tasks", (req, res) => {
  const task = req.body;
  if (!task || !task.title || task.title.trim() === "") {
    return res.status(400).send({ error: "Title is required" });
  }

  const newTask = {
    id: list.length + 1,
    title: task.title,
    done: false
  };

  list.push(newTask);

  return res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const task = req.body;
  const taskId = parseInt(req.params.id);
  const taskIndex = list.findIndex(task => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).send({ error: `Task ${taskId} not found` });
  }
  if (!task || !task.title || task.title.trim() === "") {
    return res.status(400).send({ error: "Bad Request" });
  }
  if (typeof task.done !== "boolean") {
    return res.status(400).send({ error: "Bad Request" });
  }
  else {
    list[taskIndex] = { ...list[taskIndex], title: task.title, done: task.done };
    return res.status(200).json(list[taskIndex]);
  }
});


app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);

    const taskIndex = list.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).send({ error: `Task ${taskId} not found` });
    }

    list.splice(taskIndex, 1);

    return res.status(204).end();
});
