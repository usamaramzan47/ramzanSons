const pool = require('../config/db');
const moment = require('moment-timezone');

const createOrder = async (req, res) => {
    const { shop_id, order_taker_name } = req.body;

    // Validate the inputs
    if (!shop_id || shop_id === undefined || Array.isArray(shop_id)) {
        return res.status(400).json({ message: "shop id is required.", error: "shop id is required and it should not an array" });
    }

    if (!order_taker_name || order_taker_name === undefined || Array.isArray(order_taker_name)) {
        return res.status(400).json({ message: "order taker name is required.", error: "order taker name is required. and it should not an array" });
    }
    // Get current date and time in Asia/Karachi timezone
    const karachiTime = moment.tz('Asia/Karachi');

    // Format to 'YYYY-MM-DD HH:MM'
    const formattedDate = karachiTime.format('YYYY-MM-DD HH:mm');

    try {
        const result = await pool.query(
            `INSERT INTO Orders (shop_id, order_date , order_taker_name)
             VALUES ($1, $2, $3)
             RETURNING *;`,
            [shop_id, formattedDate, order_taker_name]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23503')
            res.status(400).json({ message: 'invalid shop id' });
        else
            res.status(500).json({ message: 'Temporary service Down!', error: err });

    }
};

const getOrdersByDate = async (req, res) => {
    const { date } = req.body;
    try {
        // Fetch all orders match by date from the database
        const result = await pool.query(`
                SELECT o.*, s.shop_name,s.shop_num, s.img from 
                orders o 
                join shops s on s.shop_id = o.shop_id 
                WHERE DATE(order_date) = $1;`, [date]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'no OrderS record!' });
        }
        // Define the desired time zone
        const timeZone = 'Asia/Karachi'; // Adjust to your desired time zone

        // Map over each order to format the date
        const orders = result.rows.map(order => {
            // Convert the UTC date from the database to the desired time zone
            const zonedDate = moment.utc(order.order_date).tz(timeZone);
            // Format the date to 'YYYY-MM-DD HH:mm'
            return {
                ...order,
                order_date: zonedDate.format('YYYY-MM-DD HH:mm')
            };
        });

        // Send the formatted orders as the response
        res.status(200).json(orders);
    } catch (err) {

        res.status(500).json({ message: 'Temporary service Down!', error: err });
    }
};
const getAllOrders = async (req, res) => {
    try {
        // Fetch all orders from the database
        const result = await pool.query(`
                SELECT o.*, s.shop_name,s.shop_num, s.img from 
                orders o 
                join shops s on s.shop_id = o.shop_id;`);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'no OrderS record!' });
        }
        // Define the desired time zone
        const timeZone = 'Asia/Karachi'; // Adjust to your desired time zone

        // Map over each order to format the date
        const orders = result.rows.map(order => {
            // Convert the UTC date from the database to the desired time zone
            const zonedDate = moment.utc(order.order_date).tz(timeZone);
            // Format the date to 'YYYY-MM-DD HH:mm'
            return {
                ...order,
                order_date: zonedDate.format('YYYY-MM-DD HH:mm')
            };
        });

        // Send the formatted orders as the response
        res.status(200).json(orders);
    } catch (err) {

        res.status(500).json({ message: 'Temporary service Down!', error: err });
    }
};

const getOrderById = async (req, res) => {
    const { order_id } = req.params;

    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(order_id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    try {
        const result = await pool.query(
            `SELECT * FROM Orders WHERE order_id = $1;`,
            [order_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Define the desired time zone
        const timeZone = 'Asia/Karachi'; // Adjust to your desired time zone

        // Map over each order to format the date
        const orders = result.rows.map(order => {
            // Convert the UTC date from the database to the desired time zone
            const zonedDate = moment.utc(order.order_date).tz(timeZone);
            // Format the date to 'YYYY-MM-DD HH:mm'
            return {
                ...order,
                order_date: zonedDate.format('YYYY-MM-DD HH:mm')
            };
        });

        // Send the formatted orders as the response
        res.status(200).json(orders);
    } catch (err) {
        if (err.code === '22003')
            res.status(400).json({ message: 'id not exist!' });
        else
            res.status(500).json({ message: 'Temporary service Down!', error: err });
    }
};

const updateOrder = async (req, res) => {
    const { order_id } = req.params;
    const { shop_id, order_taker_name } = req.body;

    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(order_id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    // Validate the inputs
    if (
        (!shop_id || Array.isArray(shop_id)) &&
        (!order_taker_name || Array.isArray(order_taker_name))
    ) {
        return res.status(400).json({
            message: "No Object Found!",
            error: "Either shop_id and order_taker_name must be provided and should not be an array"
        });
    }

    try {
        const result = await pool.query(
            `UPDATE Orders
             SET shop_id = COALESCE($1, shop_id),
                 order_taker_name = COALESCE($2, order_taker_name)
             WHERE order_id = $3
             RETURNING *;`,
            [shop_id, order_taker_name, order_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (err.code === '22003')
            res.status(400).json({ message: 'id not exist!' });
        else
            res.status(500).json({ message: 'Temporary service Down!', error: err });
    }
};

const deleteOrder = async (req, res) => {
    const { order_id } = req.params;

    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(order_id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    try {
        const result = await pool.query(
            `DELETE FROM Orders WHERE order_id = $1 RETURNING *;`,
            [order_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        if (err.code === '22003')
            res.status(400).json({ message: 'id not exist!' });
        else if (err.code === "23503")
            res.status(400).json({ message: 'the order id is still engaged with another table' });
        else
            res.status(500).json({ message: 'Temporary service Down!', error: err });

    }
};

module.exports = {
    getAllOrders,
    getOrdersByDate,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}
