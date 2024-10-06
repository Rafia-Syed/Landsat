import express from "express";

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Connect to SQLite Database
const db = new sqlite3.Database("./users_db.sqlite", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");

    // Create the users table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        } else {
          console.log("Users table ready.");
        }
      }
    );
  }
});

// Signup endpoint
app.post("/api/signup", (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user already exists
  db.get(`SELECT * FROM users WHERE username = ? OR email = ?`, [username, email], (err, row) => {
    if (row) {
      return res.status(400).json({ message: "Username or email already taken." });
    } else {
      // Insert the new user
      db.run(
        `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
        [username, email, password],
        function (err) {
          if (err) {
            res.status(400).json({ message: "Error during signup." });
          } else {
            res.status(200).json({ message: "Signup successful!" });
          }
        }
      );
    }
  });
});

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  db.get(
    `SELECT * FROM users WHERE username = ? AND password = ?`,
    [username, password],
    (err, row) => {
      if (err) {
        res.status(400).json({ message: "Error during login." });
      } else if (row) {
        res.status(200).json({ message: "Login successful!" });
      } else {
        res.status(401).json({ message: "Invalid username or password." });
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
