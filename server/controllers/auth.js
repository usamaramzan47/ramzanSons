const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

const register = async (req, res) => {
    const { username, password, role_id } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO Users (username, password, role_id) VALUES ($1, $2, $3) RETURNING user_id, username, role_id, created_at',
            [username, hashedPassword, role_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

//login user

const login = async (req, res) => {
    const { username, password } = req.body;

    if (username === undefined || password === undefined) {
        return res.status(400).json({ message: 'username or password is required!' });
    }

    try {
        const result = await pool.query('SELECT * FROM Users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ user_id: user.user_id, role_id: user.role_id }, process.env.JWT_KEY, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = {
    register,
    login,
}