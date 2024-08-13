const bcrypt = require('bcryptjs');
const pool = require('../config/db');

const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT u.user_id, u.username,
            r.permissions as permissions,
            e.role as designation, d.department_name,
            e.address, e.image
            FROM users u
            LEFT JOIN roles r on u.role_id = r.role_id
            LEFT JOIN employees e on u.employee_id = e.employee_id
            LEFT JOIN departments d on e.department_id = d.department_id`
        );
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

const createUser = async (req, res) => {
    const { username, password, role_id, employee_id } = req.body;

    if (!password)
        return res.status(400).json({ message: 'password is required' });
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, password, role_id, employee_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, hashedPassword, role_id, employee_id]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === "23502")
            return res.status(400).json({ message: 'missing required filed(s)', error: err.column });
        else if (err.code === "23503")
            return res.status(400).json({ message: err.detail });
        else if (err.code === "23505")
            return res.status(400).json({ message: 'username already exist' });


        res.status(500).json({ message: 'Server error', error: err });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    try {
        const result = await pool.query(
            `SELECT u.user_id, u.username, r.permissions as permissions,
            e.role as designation, d.department_name,
            e.address, e.image
            FROM users u
            LEFT JOIN roles r on u.role_id = r.role_id
            LEFT JOIN employees e on u.employee_id = e.employee_id
            LEFT JOIN departments d on e.department_id = d.department_id
            WHERE u.user_id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        let setClause = [];
        let values = [id];

        for (const [key, value] of Object.entries(updates)) {
            if (key === 'password') {

                const hashedPassword = await bcrypt.hash(value, 10);
                setClause.push(`password = $${values.length + 1}`);
                values.push(hashedPassword);
            } else {
                setClause.push(`${key} = $${values.length + 1}`);
                values.push(value);
            }
        }
        if (setClause.length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        const query = `UPDATE users SET ${setClause.join(', ')} WHERE user_id = $1 RETURNING *`;
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.log(err)
        if (err.code === "42703")
            return res.status(400).json({ message: 'No fields match to update' });
        else if (err.code === "23503")
            return res.status(400).json({ message: err.detail });

        res.status(500).json({ message: 'Server error', error: err });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM users WHERE user_id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};
