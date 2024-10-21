const pool = require('../config/db');
const moment = require('moment-timezone');

const createOrderDetail = async (req, res) => {
    const { order_id, products } = req.body; // Expecting products as an array of { product_id, quantity }

    // Ensure products is an array
    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: 'Products list is required and cannot be empty' });
    }

    const values = products.map(({ product_id, quantity }) => `(${order_id}, ${product_id}, ${quantity})`).join(", ");

    try {
        const query = `
            INSERT INTO OrderDetails (order_id, product_id, quantity)
            VALUES ${values}
            RETURNING *;
        `;

        const result = await pool.query(query);
        res.status(201).json(result.rows); // Return all inserted rows
    } catch (err) {
        if (err.code === '22P02' || err.code === '22003' || err.code === '23503')
            res.status(400).json({ message: 'product id or order id not exist!' });
        else
            res.status(500).json({ message: 'Temporary Service Down!', error: err });
    }
};


const getAllOrderDetails = async (req, res) => {
    try {
        const result = await pool.query(` SELECT 
                od.order_detail_id, 
                od.order_id, 
                od.quantity, 
                p.product_id,
                p.product_name, 
                s.shop_name,
                o.order_date
            FROM 
                OrderDetails od
            JOIN 
                Products p ON od.product_id = p.product_id
            JOIN 
                Orders o ON od.order_id = o.order_id
            JOIN 
                Shops s ON o.shop_id = s.shop_id;
        `);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Order details not found' });
        }

        // Define the desired time zone
        const timeZone = 'Asia/Karachi'; // Adjust to your desired time zone

        // Map over each order to format the date
        const orders = result.rows.map(order => {
            try {
                // Convert the UTC date from the database to the desired time zone
                const zonedDate = moment.utc(order.order_date).tz(timeZone);

                // Format the date to 'YYYY-MM-DD HH:mm'
                return {
                    ...order,
                    order_date: zonedDate.format('YYYY-MM-DD HH:mm')
                };
            } catch (conversionError) {
                console.error(`Error converting date for order ID ${order.order_id}:`, conversionError);
                return {
                    ...order,
                    order_date: order.order_date // Fallback to the original date
                };
            }
        });

        // Send the formatted orders as the response
        res.status(200).json(orders);
    } catch (err) {

        res.status(500).json({ message: 'Temporary Service Down!', error: err });
    }
};

const getOrderDetailsByOrderId = async (req, res) => {
    try {
        const { order_id } = req.params;

        // Check if id is a valid integer using a regular expression
        if (!/^\d+$/.test(order_id)) {
            return res.status(400).json({ error: 'ID must be an integer' });
        }
        const result = await pool.query(
            `SELECT 
                od.order_detail_id, 
                od.order_id, 
                od.quantity, 
                p.product_id,
                p.product_name, 
                s.shop_name,
                o.order_date
            FROM 
                OrderDetails od
            JOIN 
                Products p ON od.product_id = p.product_id
            JOIN 
                Orders o ON od.order_id = o.order_id
            JOIN 
                Shops s ON o.shop_id = s.shop_id
            WHERE o.order_id = $1;`,
            [order_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Order details not found' });
        }

        // Define the desired time zone
        const timeZone = 'Asia/Karachi'; // Adjust to your desired time zone

        // Map over each order to format the date
        const orders = result.rows.map(order => {
            try {
                // Convert the UTC date from the database to the desired time zone
                const zonedDate = moment.utc(order.order_date).tz(timeZone);

                // Format the date to 'YYYY-MM-DD HH:mm'
                return {
                    ...order,
                    order_date: zonedDate.format('YYYY-MM-DD HH:mm')
                };
            } catch (conversionError) {
                console.error(`Error converting date for order ID ${order.order_id}:`, conversionError);
                return {
                    ...order,
                    order_date: order.order_date // Fallback to the original date
                };
            }
        });

        // Send the formatted orders as the response
        res.status(200).json(orders);
    } catch (err) {

        if (err.code === '22P02' || err.code === '22003' || err.code === '23503') {
            res.status(400).json({ message: 'id not exist!' })
        } else {
            res.status(500).json({ message: 'Temporary Service Down!', error: err });
        }
    }

};

const updateOrderDetail = async (req, res) => {
    const { order_detail_id } = req.params;
    const { order_id, product_id, quantity } = req.body;

    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(order_detail_id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    // Validate the inputs
    if (
        (!order_id || Array.isArray(order_id)) &&
        (!product_id || Array.isArray(product_id)) &&
        (!quantity || Array.isArray(quantity))
    ) {
        return res.status(400).json({
            message: "No Object Found!",
            error: "Either order_id and product_id and quantity must be provided and should not be an array"
        });
    }
    try {
        const result = await pool.query(
            `UPDATE OrderDetails
             SET order_id = COALESCE($1, order_id),
                 product_id = COALESCE($2, product_id),
                 quantity = COALESCE($3, quantity)
             WHERE order_detail_id = $4
             RETURNING *;`,
            [order_id, product_id, quantity, order_detail_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Order detail not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (err.code === '22P02' || err.code === '22003' || err.code === '23503')
            res.status(400).json({ message: 'id not exist!' });
        else
            res.status(500).json({ message: 'Temporary Service Down!', error: err });
    }
};

const deleteOrderDetail = async (req, res) => {
    const { order_detail_id } = req.params;

    // Check if id is a valid integer using a regular expression
    if (!/^\d+$/.test(order_detail_id)) {
        return res.status(400).json({ error: 'ID must be an integer' });
    }
    try {
        const result = await pool.query(
            `DELETE FROM OrderDetails WHERE order_detail_id = $1 RETURNING *;`,
            [order_detail_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Order detail not found' });
        }

        res.status(200).json({ message: 'Order detail deleted successfully' });
    } catch (err) {
        if (err.code === "23503")
            res.status(400).json({ message: 'the order id is still engaged with another table' });
        else if (err.code === '22P02' || err.code === '22003' || err.code === '23503')
            res.status(400).json({ message: 'id not exist!' });
        else
            res.status(500).json({ message: 'Temporary Service Down!', error: err });
    }
};

module.exports = {
    createOrderDetail,
    getAllOrderDetails,
    getOrderDetailsByOrderId,
    updateOrderDetail,
    deleteOrderDetail
}