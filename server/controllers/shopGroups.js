const pool = require('../config/db');

// Create a new shop group
const createShopGroup = async (req, res) => {
    const { group_name } = req.body;

    // Validate the inputs
    if (!group_name || group_name === undefined || Array.isArray(group_name)) {
        return res.status(400).json({ message: "Product name is required and must not be an array" });
    }
    try {
        const result = await pool.query(
            'INSERT INTO shopgroups (group_name) VALUES ($1) RETURNING *',
            [group_name]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Temporary Service Down', error: err });
    }
};

// Get all shop groups
const getAllShopGroups = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM shopgroups');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Temporary Service Down', error: error });
    }
};

// Get a shop group by ID
const getShopGroupById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `SELECT DISTINCT ON ( p.product_name)
                p.product_id,
                p.product_name, 
                sp.price, 
                sg.group_name
            FROM 
            shopgroups sg
            JOIN 
                shopPrices sp ON sp.group_id = sg.group_id
            JOIN 
                Products p ON p.product_id = sp.product_id
            WHERE 
                sp.group_id = $1;`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'ShopGroup not found' });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Temporary Service Down', error: error });
    }
};

// Update a shop group by ID
const updateShopGroup = async (req, res) => {

    const { groupId } = req.params;
    const { group_name } = req.body;

    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(groupId)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }

    try {
        const result = await pool.query(
            'UPDATE shopgroups SET group_name = $1 WHERE group_id = $2 RETURNING *',
            [group_name, groupId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Shopgroup not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Temporary Service Down', error: error });
    }
};

// Delete a shop group by ID
const deleteShopGroup = async (req, res) => {
    const { groupId } = req.params;

    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(groupId)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    try {
        const result = await pool.query(
            'DELETE FROM shopgroups WHERE group_id = $1 RETURNING *',
            [groupId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'ShopGroup not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Temporary Service Down', error: error });
    }
};

module.exports = {
    createShopGroup,
    getAllShopGroups,
    getShopGroupById,
    updateShopGroup,
    deleteShopGroup,
};
