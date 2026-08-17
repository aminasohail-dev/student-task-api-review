# Student Task Manager API

A REST API built with Node.js and Express.js for managing student tasks with MySQL database integration.

## Project 3 – Database Integration

This project extends the Student Task Manager API by connecting the backend to a MySQL database for permanent data storage and retrieval.

## Technologies Used

* Node.js
* Express.js
* JavaScript
* MySQL
* mysql2
* Postman

## Features

* Create a new student task
* Retrieve all student tasks
* Update an existing task
* Delete a task
* Basic input validation
* Error handling
* JSON responses
* HTTP status codes
* MySQL database integration

## Database

**Database:** `student_task_db`

**Table:** `tasks`

| Field   | Type         | Description                 |
| ------- | ------------ | --------------------------- |
| id      | INT          | Primary key, auto-increment |
| title   | VARCHAR(100) | Task title                  |
| subject | VARCHAR(100) | Task subject                |
| status  | VARCHAR(30)  | Task status                 |

## API Endpoints

| Method | Endpoint         | Purpose            |
| ------ | ---------------- | ------------------ |
| GET    | `/api/tasks`     | Retrieve all tasks |
| POST   | `/api/tasks`     | Create a new task  |
| PUT    | `/api/tasks/:id` | Update a task      |
| DELETE | `/api/tasks/:id` | Delete a task      |

## How to Run

1. Open the project folder in VS Code.
2. Start MySQL from XAMPP.
3. Open the terminal.
4. Install dependencies:

```bash
npm install
```

5. Start the server:

```bash
node server.js
```

6. The API will run at:

```text
http://localhost:3000
```

## Testing

The API was tested using Postman for:

* Create (POST)
* Read (GET)
* Update (PUT)
* Delete (DELETE)
* Invalid input
* Non-existing task IDs

## Project Objective

The objective of this project is to connect a backend application with a database and implement CRUD operations for reliable and permanent data storage.
