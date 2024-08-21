const pool = require('../config/db');

const createDiscount = async (req, res) => {
    const { shop_id, discount_percentage } = req.body;

    if (!shop_id || !discount_percentage) {
        return res.status(400).json({ message: "Shop ID and Discount Percentage are required." });
    }

    try {
        const result = await pool.query(
            `INSERT INTO Discounts (shop_id, discount_percentage)
             VALUES ($1, $2)
             RETURNING *;`,
            [shop_id, discount_percentage]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '22P02' || err.code === '22003' || err.code === '23503')
            res.status(400).json({ message: 'id not exist!' });
        else
            res.status(500).json({ message: 'Temporary Service Down!', error: err });
    }
};


const getAllDiscounts = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT d.discount_id, d.shop_id, s.shop_name, d.discount_percentage, d.created_at
             FROM Discounts d
             JOIN Shops s ON d.shop_id = s.shop_id
             ORDER BY d.created_at DESC;`
        );

        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Temporary Service Down!', error: err });
    }
};

const getDiscountById = async (req, res) => {
    const { discount_id } = req.params;
    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(discount_id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    try {
        const result = await pool.query(
            `SELECT d.discount_id, d.shop_id, s.shop_name, d.discount_percentage, d.created_at
             FROM Discounts d
             JOIN Shops s ON d.shop_id = s.shop_id
             WHERE d.discount_id = $1;`,
            [discount_id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Discount not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (err.code === '22P02' || err.code === '22003' || err.code === '23503')
            res.status(400).json({ message: 'id not exist!' });
        else
            res.status(500).json({ message: 'Temporary Service Down!', error: err });
    }
};


const updateDiscount = async (req, res) => {
    const { discount_id } = req.params;
    const { shop_id, discount_percentage } = req.body;

    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(discount_id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    if (!shop_id && !discount_percentage) {
        return res.status(400).json({ message: "At least one of shop_id or discount_percentage must be provided." });
    }

    try {
        const result = await pool.query(
            `UPDATE Discounts
             SET shop_id = COALESCE($1, shop_id),
                 discount_percentage = COALESCE($2, discount_percentage)
             WHERE discount_id = $3
             RETURNING *;`,
            [shop_id, discount_percentage, discount_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Discount not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (err.code === '22P02' || err.code === '22003' || err.code === '23503')
            res.status(400).json({ message: 'id not exist! or invalid input' });
        else
            res.status(500).json({ message: 'Temporary Service Down!', error: err });
    }
};


const deleteDiscount = async (req, res) => {
    const { discount_id } = req.params;

    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(discount_id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    try {
        const result = await pool.query(
            `DELETE FROM Discounts
             WHERE discount_id = $1
             RETURNING *;`,
            [discount_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Discount not found' });
        }

        res.status(200).json({ message: 'Discount deleted successfully' });
    } catch (err) {
        if (err.code === '22P02' || err.code === '22003' || err.code === '23503')
            res.status(400).json({ message: 'id not exist!' });
        else
            res.status(500).json({ message: 'Temporary Service Down!', error: err });
    }
};

module.exports = {
    createDiscount,
    getAllDiscounts,
    getDiscountById,
    updateDiscount,
    deleteDiscount
}