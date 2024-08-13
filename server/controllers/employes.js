const pool = require('../config/db');

const getAllEmployees = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT e.employee_id, e.name, d.department_name, e.role, e.phone_number, e.address, e.image 
             FROM employees e
             LEFT JOIN departments d ON e.department_id = d.department_id;`
        );
        res.status(200).json(result.rows);
    } catch (err) {

        res.status(500).json({ message: 'Server error', error: err });
    }
}

//get by id
const getEmployeeById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `SELECT e.employee_id, e.name, d.department_name, e.role, e.phone_number, e.address, e.image 
             FROM employees e
             LEFT JOIN departments d ON e.department_id = d.department_id
             WHERE e.employee_id = $1;`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
}

// create new employee
const createEmployee = async (req, res) => {
    const { name, department_id, role, phone_number, address, image } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO employees (name, department_id, role, address, phone_number, image)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *;`,
            [name, department_id, role, address, phone_number, image]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.column)
            return res.status(400).json({ error: `Required field missing ${err.column}` });
        else if (err.detail)
            return res.status(400).json({ error: `${err.detail}` });

        res.status(500).json({ message: 'Server error', error: err });
    }
}

//update employee
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const fields = req.body;

    // Check if fields are provided
    if (Object.keys(fields).length === 0) {
        return res.status(400).json({ message: 'No fields provided for update' });
    }

    try {
        // Construct the dynamic query
        let query = 'UPDATE employees SET ';
        let values = [];
        let counter = 1;

        for (const [key, value] of Object.entries(fields)) {
            query += `${key} = $${counter}, `;
            values.push(value);
            counter++;
        }

        // Remove the last comma and space, and add the WHERE clause
        query = query.slice(0, -2);
        query += ` WHERE employee_id = $${counter} RETURNING *;`;
        values.push(id);

        // Execute the query
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
}

// delete an employee
const deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `DELETE FROM employees
             WHERE employee_id = $1
             RETURNING *;`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
        if (err.code === "23503")
            return res.status(400).json({ message: 'relation with other table', error: err.detail });

        res.status(500).json({ message: 'Server error', error: err });
    }
}

// get all employees related to a specfic department
const getEmployeeByDept = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `SELECT e.* , d.department_name from employees e
             JOIN departments d on e.department_id = d.department_id
             where e.department_id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'no record echo!' });
        }
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeByDept
};
