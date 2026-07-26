
let list = [{ id: 1, title: "task1", done: true }
  , { id: 2, title: "task2", done: false }
  , { id: 3, title: "task3", done: true }]


const Database = require('better-sqlite3');
const path = require('path');

// 1. Connect to (or create) the SQLite database file
const dbPath = path.resolve(__dirname, 'tasks.db');
const db = new Database(dbPath);

// 2. Enable Write-Ahead Logging (WAL) for better performance in web servers
db.pragma('journal_mode = WAL');

// 3. Create tables and seed initial data if empty
const initDb = () => {
  const schema = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      done BOOLEAN NOT NULL DEFAULT 0
    );
  `;
  db.exec(schema);

  // Check if the table is currently empty
  const countStmt = db.prepare('SELECT COUNT(*) AS count FROM tasks');
  const { count } = countStmt.get();

  if (count === 0) {
    // Prepare statement for efficiency
    const insertStmt = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');

    // Seed 3 initial tasks using a transaction for speed and reliability
    const seedData = db.transaction(() => {
    for (const task of list) {  
        insertStmt.run(task.title, task.done ? 1 : 0);
    }
    });

    seedData();
    console.log('Database seeded with example tasks.');
  }
};

// Run the setup script
initDb();

module.exports = db;