const pool = require('../config/db');

const createDepartment = async (req, res) => {
    const { department_name } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO Departments (department_name) VALUES ($1) RETURNING *',
            [department_name]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.constraint === "unique_department_name") {
            return res.status(400).json({ message: 'department name already exist' });
        }

        res.status(500).json({ message: 'Temporary Service Down', error: err });
    }
};

const getAllDepartments = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM Departments;`);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Temporary Service Down', error: err });
    }
};

const getDepartmentById = async (req, res) => {
    const { id } = req.params;
    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    try {
        const result = await pool.query(
            'SELECT * FROM Departments WHERE department_id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (err.code === '22003')
            res.status(400).json({ message: 'id not exist!' });
        else
            res.status(500).json({ message: 'Temporary Service Down', error: err });
    }
};

const updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { department_name } = req.body;

    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    try {
        const result = await pool.query(
            'UPDATE Departments SET department_name = $1 WHERE department_id = $2 RETURNING *',
            [department_name, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (err.code === '22003')
            res.status(400).json({ message: 'id not exist!' });
        else
            res.status(500).json({ message: 'Temporary Service Down', error: err });
    }
};

const deleteDepartment = async (req, res) => {
    const { id } = req.params;
    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    try {
        const result = await pool.query(
            'DELETE FROM Departments WHERE department_id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (err) {
        if (err.code === "23503")
            res.status(400).json({ message: 'the id is still engaged with another table' });
        else if (err.code === '22003')
            res.status(400).json({ message: 'id not exist!' });
        else
            res.status(500).json({ error: 'Temporary Service Down', detail: error.message });
    }

};

module.exports = {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
};
