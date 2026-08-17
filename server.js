const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "student_task_db",
    port: 3308
});

// Test database connection
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to MySQL database!");
    }
});

// GET API - Read all tasks
app.get("/api/tasks", (req, res) => {
    const sql = "SELECT * FROM tasks";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json({
            success: true,
            tasks: results
        });
    });
});

// POST API - Create a task
app.post("/api/tasks", (req, res) => {
    const { title, subject, status } = req.body;

    // Basic validation
    if (!title || !subject || !status) {
        return res.status(400).json({
            success: false,
            message: "Title, subject and status are required"
        });
    }

    const sql = "INSERT INTO tasks (title, subject, status) VALUES (?, ?, ?)";

    db.query(sql, [title, subject, status], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.status(201).json({
            success: true,
            message: "Task added successfully",
            task: {
                id: result.insertId,
                title: title,
                subject: subject,
                status: status
            }
        });
    });
});

// PUT API - Update a task
app.put("/api/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { title, subject, status } = req.body;

    // Basic validation
    if (!title || !subject || !status) {
        return res.status(400).json({
            success: false,
            message: "Title, subject and status are required"
        });
    }

    const sql = `
        UPDATE tasks
        SET title = ?, subject = ?, status = ?
        WHERE id = ?
    `;

    db.query(sql, [title, subject, status, id], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.json({
            success: true,
            message: "Task updated successfully"
        });
    });
});

// DELETE API - Delete a task
app.delete("/api/tasks/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM tasks WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.json({
            success: true,
            message: "Task deleted successfully"
        });
    });
});

// 404 response
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});