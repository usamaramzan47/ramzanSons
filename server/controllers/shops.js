const pool = require('../config/db');

// Create Shop
const createShop = async (req, res) => {
    const { shop_name, shop_address } = req.body;

    if (!shop_name || shop_name === undefined || Array.isArray(shop_name)) {
        return res.status(400).json({ message: "Shop name is required and must not be an array" });
    }

    if (!shop_address || shop_address === undefined || Array.isArray(shop_address)) {
        return res.status(400).json({ message: "Shop address is required and must not be an array" });
    }

    try {
        const result = await pool.query(
            `INSERT INTO Shops (shop_name, shop_address)
             VALUES ($1, $2)
             RETURNING *`,
            [shop_name, shop_address]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Temporary Services down', error: err });
    }
};

// Get All Shops
const getAllShops = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM Shops`);

        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Temporary Service Down', error: err });
    }
};

// Get Shop by ID
const getShopById = async (req, res) => {
    const { id } = req.params;

    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    try {
        const result = await pool.query(`SELECT * FROM Shops WHERE shop_id = $1`, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (err.code === '22003')
            res.status(400).json({ message: 'id not exist!' });
        else
            res.status(500).json({ message: 'Temporary Service Down', error: err });
    }
};

// Update Shop
const updateShop = async (req, res) => {
    const { id } = req.params;
    const { shop_name, shop_address } = req.body;

    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }

    if (!shop_name || shop_name === undefined || Array.isArray(shop_name)) {
        return res.status(400).json({ message: "Shop name is required and must not be an array" });
    }

    if (!shop_address || shop_address === undefined || Array.isArray(shop_address)) {
        return res.status(400).json({ message: "Shop address is required and must not be an array" });
    }

    try {
        const result = await pool.query(
            `UPDATE Shops
             SET shop_name = COALESCE($1, shop_name),
                 shop_address = COALESCE($2, shop_address)
             WHERE shop_id = $3
             RETURNING *`,
            [shop_name, shop_address, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (err.code === '22003')
            res.status(400).json({ message: 'id not exist!' });
        else
            res.status(500).json({ message: 'Temporary Service Down', error: err });
    }
};

// Delete Shop
const deleteShop = async (req, res) => {
    const { id } = req.params;
    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    try {
        const result = await pool.query(`DELETE FROM Shops WHERE shop_id = $1 RETURNING *`, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        res.status(200).json({ message: 'Shop deleted successfully' });
    } catch (err) {
        if (err.code === "23503")
            res.status(400).json({ message: 'the id is still engaged with another table' });
        else if (err.code === '22003')
            res.status(400).json({ message: 'id not exist!' });
        else
            res.status(500).json({ message: 'Temporary Service Down', error: err });
    }
};

module.exports = {
    createShop,
    getAllShops,
    getShopById,
    updateShop,
    deleteShop
};
