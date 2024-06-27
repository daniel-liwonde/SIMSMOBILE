const express = require('express');
const mysql = require('mysql2/promise');
const crypto= require('crypto');
const cors = require('cors');
const app = express();
const port = 3000;
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tecg_db',
};
app.use(cors()); // Enable CORS for all routes
// GET request to fetch all users
app.get('/api/data', async (req, res) => {
    //req.headers('Access-Control-Allow-Origin', '*');
    try {
        
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connected to MySQL');
        const [rows] = await connection.execute('SELECT * FROM teacher');
        connection.end();
        res.json(rows);
    } catch (error) {
        console.error('Error connecting to MySQL:', error.message);
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
});
//LOGIN_USER
app.get('/api/login/:username/:password', async (req,res) => {
    req.headers('Access-Control-Allow-Origin', '*');
    const username=req.params.username;
    const pass=req.params.password;
    let password= crypto.createHash('md5').update(pass).digest('hex');
    try {
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM teacher WHERE username=? AND password=?',[username,password]);
        if (rows != null) {
            res.json({message:"OK"});
        }
        else
        {
            res.json({message: "Wrong username or password"});
        }
    } catch (error) {
        res.json({message:`An error has occoured: ${error.message}`});
    }
});
// DELETE request to delete a user by ID
app.delete('/api/delete/:id', async (req, res) => {
    req.headers('Access-Control-Allow-Origin', '*');
    const userId = req.params.id;
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connected to MySQL');
        // Check if the user with the given ID exists
        const [user] = await connection.execute('SELECT * FROM teacher WHERE teacher_id = ?', [userId]);
        if (user.length === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            // Delete the user with the given ID
            await connection.execute('DELETE FROM teacher WHERE teacher_id = ?', [userId]);
            res.json({ message: 'User deleted successfully' });
        }
        connection.end();
    } catch (error) {
        console.error('Error connecting to MySQL:', error.message);
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
});
app.listen(port, () => {
    console.log(`Server is - http://localhost:${port}`);
});
