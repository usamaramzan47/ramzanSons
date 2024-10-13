const pool = require('../config/db');

// Create ShopPrice
const createShopPrice = async (req, res) => {
    const { newPrice } = req.body;

    let group_id = newPrice.group_id;
    let product_id = newPrice.product_id;
    let price = newPrice.price;

    if (!group_id || group_id === undefined || isNaN(group_id)) {
        return res.status(400).json({ message: "Valid group_id is required" });
    }

    if (!product_id || product_id === undefined || isNaN(product_id)) {
        return res.status(400).json({ message: "Valid product_id is required" });
    }

    if (!price || price === undefined || isNaN(price)) {
        return res.status(400).json({ message: "Valid price is required" });
    }

    try {
        const result = await pool.query(
            `WITH inserted AS (
                INSERT INTO ShopPrices (group_id, product_id, price)
                VALUES ($1, $2, $3)
                RETURNING *
            )
            SELECT 
                i.product_id, 
                p.product_name, 
                i.price,
                i.shop_price_id,
                sg.group_name
            FROM 
                inserted i
            JOIN 
                Products p ON p.product_id = i.product_id
            JOIN 
                Shopgroups sg ON sg.group_id = i.group_id;`,
            [group_id, product_id, price]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {

        if (err.code === '23503') { // Foreign key violation
            return res.status(400).json({ message: 'Invalid shop or product ID provided.' });
        }
        res.status(500).json({ message: 'Temporary Services down', error: err });
    }
};

// Get All ShopPrices
const getAllShopPrices = async (req, res) => {
    try {
        const result = await pool.query(`SELECT 
                sp.shop_price_id,
                s.shop_id, 
                s.shop_name, 
                p.product_id, 
                p.product_name, 
                sp.price 
             FROM 
                ShopPrices sp
             JOIN 
                Shops s ON sp.shop_id = s.shop_id
             JOIN 
                Products p ON sp.product_id = p.product_id;`);

        res.status(200).json(result.rows);
    } catch (err) {

        res.status(500).json({ message: 'Temporary Services down', error: err });
    }
};

// Get ShopPrice by ID
const getShopPriceById = async (req, res) => {
    const { id } = req.params;
    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    try {
        const result = await pool.query(`SELECT 
                sp.shop_price_id,
                s.shop_id, 
                s.shop_name, 
                p.product_id, 
                p.product_name, 
                sp.price 
             FROM 
                ShopPrices sp
             JOIN 
                Shops s ON sp.shop_id = s.shop_id
             JOIN 
                Products p ON sp.product_id = p.product_id
             WHERE sp.shop_price_id = $1`, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'ShopPrice not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (err.code === '22003')
            res.status(400).json({ message: 'id not exist!' });
        else
            res.status(500).json({ message: 'Temporary Services down', error: err });
    }
};

const getShopRatesByShopId = async (req, res) => {
    const { shop_id } = req.params;

    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(shop_id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    try {
        const result = await pool.query(
            `SELECT 
                sp.shop_price_id,
                s.shop_id, 
                s.shop_name, 
                p.product_id, 
                p.product_name, 
                sp.price 
             FROM 
                ShopPrices sp
             JOIN 
                Shops s ON sp.shop_id = s.shop_id
             JOIN 
                Products p ON sp.product_id = p.product_id
             WHERE 
                s.shop_id = $1;`,
            [shop_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No rates found for the specified shop' });
        }

        res.status(200).json(result.rows);
    } catch (err) {
        if (err.code === '22003')
            res.status(400).json({ message: 'id not exist!' });
        else
            res.status(500).json({ message: 'Temporary Service Down', error: err });
    }
};

// get ShopRates By Shop Name
const getShopRatesByShopName = async (req, res) => {
    const { shop_name } = req.params;

    try {
        const result = await pool.query(
            `SELECT 
                sp.shop_price_id,
                s.shop_id, 
                s.shop_name, 
                p.product_id, 
                p.product_name, 
                sp.price 
             FROM 
                ShopPrices sp
             JOIN 
                Shops s ON sp.shop_id = s.shop_id
             JOIN 
                Products p ON sp.product_id = p.product_id
             WHERE 
                s.shop_name = $1;`,
            [shop_name]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No rates found for the specified shop' });
        }

        res.status(200).json(result.rows);
    } catch (err) {
        if (err.code === '22003')
            res.status(400).json({ message: 'No Record exist!' });
        res.status(500).json({ message: 'Temporary Services down', error: err });
    }
};

// Update ShopPrice
const updateShopPrice = async (req, res) => {
    const { id } = req.params;
    const { price } = req.body;
    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    // Validate price: it should be a positive float number
    if (typeof price !== 'number' || price <= 0 || price > 10000 || !Number.isFinite(price)) {
        return res.status(400).json({ message: 'Invalid price. Must be a positive float & n < 10000.' });
    }
    try {
        const result = await pool.query(
            `WITH updated AS (
            UPDATE ShopPrices
            SET price = COALESCE($1, price)
            WHERE shop_price_id = $2
            RETURNING *)
            SELECT 
                updated.*, 
                p.product_name 
            FROM 
                updated 
            JOIN 
                Products p 
            ON 
                updated.product_id = p.product_id;`,
            [price, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'ShopPrice not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (err.code === '22003')
            res.status(400).json({ message: 'id not exist!' });
        else
            res.status(500).json({ message: 'Temporary Services down', error: err });
    }
};

// Delete ShopPrice
const deleteShopPrice = async (req, res) => {
    const { id } = req.params;
    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    try {
        const result = await pool.query(`DELETE FROM ShopPrices WHERE shop_price_id = $1 RETURNING *`, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'ShopPrice not found' });
        }

        res.status(200).json({ message: 'ShopPrice deleted successfully' });
    } catch (err) {
        console.log(err)
        if (err.code === "23503")
            res.status(400).json({ message: 'the id is still engaged with another table' });
        else if (err.code === '22003')
            res.status(400).json({ message: 'id not exist!' });
        else
            res.status(500).json({ message: 'Temporary Services down', error: err });
    }
};

module.exports = {
    createShopPrice,
    getAllShopPrices,
    getShopPriceById,
    updateShopPrice,
    deleteShopPrice,
    getShopRatesByShopName,
    getShopRatesByShopId
};
