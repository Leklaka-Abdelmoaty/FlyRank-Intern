# Task API

A simple RESTful Task API built with **Node.js**, **Express**, and **Swagger UI**. It supports creating, reading, updating, and deleting tasks (CRUD) with basic request validation.

---

## Features

- RESTful CRUD API
- Request validation
- JSON responses
- Swagger UI documentation
- In-memory data storage (no database)

---

## Technologies

- Node.js
- Express.js
- Swagger UI Express
- OpenAPI 3.0

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Leklaka-Abdelmoaty/FlyRank-Intern.git
```

Move into the project:

```bash
cd FlyRank-Intern/BE-02
```

Install dependencies:

```bash
npm install
```

---

## Run

Start the server using:

```bash
node "Build your first CRUD API.js"
```

The API will be available at:

```
http://localhost:3000
```

Swagger UI:

```
http://localhost:3000/docs
```

---

# API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | API information |
| GET | `/health` | Health check |
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get a task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

---

# Example cURL Request

```bash
curl -i -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"title\":\"Buy milk\"}"
```

Example output:

```http
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 41
ETag: W/"29-xxxxxxxxxxxxxxxx"
Date: Tue, 21 Jul 2026 12:00:00 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{
  "id": 4,
  "title": "Buy milk",
  "done": false
}
```

---

# Swagger UI

Open:

```
http://localhost:3000/docs

## Swagger Demo

![Swagger Demo](swagger-demo.gif)
---

# Project Structure

```
BE-02/
│
├── Build your first CRUD API.js
├── openapi.json
├── package.json
├── package-lock.json
└── README.md
```

---

# Notes

- Data is stored in memory.
- Restarting the server resets the task list.
- API documentation is generated using OpenAPI 3.0 and served with Swagger UI.
