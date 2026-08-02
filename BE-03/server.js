import express from "express";
import pool, { initializeDatabase } from "./db.js";

const app = express();
const PORT = 3000;

app.use(express.json());

await initializeDatabase();

app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id;");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});