import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function initializeDatabase() {
  // Create the table if it doesn't exist
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      done BOOLEAN DEFAULT FALSE
    );
  `);

  // Check if the table is empty
  const result = await pool.query("SELECT COUNT(*) FROM tasks;");
  const count = Number(result.rows[0].count);

  // Seed only on first run
  if (count === 0) {
    await pool.query(`
      INSERT INTO tasks (title, done)
      VALUES
        ('Buy milk', false),
        ('Study Express', false),
        ('Walk the dog', true);
    `);

    console.log("Database seeded with example tasks.");
  } else {
    console.log("Tasks already exist. Skipping seed.");
  }
}
export async function getAllTasks() {
  const result = await pool.query("SELECT * FROM tasks;");
  return result.rows;
}
export async function getTaskById(id) {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE id = $1;",
    [id]
  );

  return result.rows[0] ?? null;
}

export default pool;