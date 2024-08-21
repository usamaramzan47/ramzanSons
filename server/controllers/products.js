const pool = require('../config/db');

const createProduct = async (req, res) => {
    const { product_name, size } = req.body;

    // Validate the inputs
    if (!product_name || product_name === undefined || Array.isArray(product_name)) {
        return res.status(400).json({ message: "Product name is required and must not be an array" });
    }

    if (!size || size === undefined || Array.isArray(size)) {
        return res.status(400).json({ message: "Size is required and must not be an array" });
    }


    try {
        const result = await pool.query(
            `INSERT INTO Products (product_name, size)
             VALUES ($1, $2)
             RETURNING *`,
            [product_name, size]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Temporary Service Down', error: err });
    }
};

// get all products
const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM Products`);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Temporary Service Down', error: err });
    }
};
//get by id
const getProductById = async (req, res) => {
    const { id } = req.params;

    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    try {
        const result = await pool.query(`SELECT * FROM Products WHERE product_id = $1`, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (err.code === '22003')
            res.status(400).json({ message: 'id not exist!' });
        else
            res.status(500).json({ message: 'Temporary Service Down', error: err });
    }
};
//update
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { product_name, size } = req.body;

    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }

    // Validate the inputs
    if (!product_name || product_name === undefined || Array.isArray(product_name)) {
        return res.status(400).json({ message: "Product name is required and must not be an array" });
    }
    if (!size || size === undefined || Array.isArray(size)) {
        return res.status(400).json({ message: "Size is required and must not be an array" });
    }
    try {
        const result = await pool.query(
            `UPDATE Products
             SET product_name = COALESCE($1, product_name),
                 size = COALESCE($2, size)
             WHERE product_id = $3
             RETURNING *`,
            [product_name, size, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (err.code === '22003')
            res.status(400).json({ message: 'id not exist!' });
        else
            res.status(500).json({ message: 'Temporary Service Down', error: err });
    }
};
//delete 
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    try {
        const result = await pool.query(`DELETE FROM Products WHERE product_id = $1 RETURNING *`, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        if (err.code === '22003')
            res.status(400).json({ message: 'id not exist!' });
        else if (err.code === "23503")
            res.status(400).json({ message: 'the id is still engaged with another table' });
        else
            res.status(500).json({ message: 'Temporary Server Down', error: err });
    }
};


module.exports = {
    getAllProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    createProduct
}