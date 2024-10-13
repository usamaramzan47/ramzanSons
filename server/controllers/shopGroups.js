const pool = require('../config/db');

// Create a new shop group
const createShopGroup = async (req, res) => {
    const { newGroup } = req.body;

    let group_name = newGroup.group_name;
    let description = newGroup.description;

    // Validate the inputs
    if (!group_name || group_name === undefined || Array.isArray(group_name)) {
        return res.status(400).json({ message: "Group name is required and must not be an array" });
    }
    try {
        const result = await pool.query(
            'INSERT INTO shopgroups (group_name, description) VALUES ($1,$2) RETURNING *',
            [group_name, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        if (error.code === '23505')
            res.status(400).json({ message: 'Name already exist' });
        else
            res.status(500).json({ message: 'Temporary Service Down', error: error });
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
                sp.shop_price_id,
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
        if (!result)
            return res.status(404).json({ message: 'Page not found' });

        else if (result.rows.length === 0) {
            return res.status(200).json({ message: 'No data available for this page' });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Temporary Service Down', error: error });
    }
};

// Update a shop group by ID
const updateShopGroup = async (req, res) => {
    const { id } = req.params;
    const { group_name, description } = req.body;

    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }

    try {
        const result = await pool.query(
            `UPDATE shopgroups
             SET group_name = COALESCE($1, group_name),
             description = COALESCE($2, description)
             WHERE group_id = $3 RETURNING *`,
            [group_name, description, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Shopgroup not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log(error, 'error of update group')

        res.status(500).json({ message: 'Temporary Service Down', error: error });
    }
};

// Delete a shop group by ID
const deleteShopGroup = async (req, res) => {
    const { id } = req.params;

    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ message: 'ID is required' });
    }
    try {
        const result = await pool.query(
            'DELETE FROM shopgroups WHERE group_id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'ShopGroup not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        if (error.code === '23503')
            return res.status(400).json({ message: 'group still have reference with pricing table' });
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
