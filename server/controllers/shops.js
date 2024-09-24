const pool = require('../config/db');
const moment = require('moment-timezone');

// Create Shop
const createShop = async (req, res) => {
    const { shop_name, shop_address, img, owner, shop_num, shop_description, groupId } = req.body;


    if (!shop_name || shop_name === undefined || Array.isArray(shop_name)) {
        return res.status(400).json({ message: "Shop name is required and must not be an array" });
    }

    if (!shop_address || shop_address === undefined || Array.isArray(shop_address)) {
        return res.status(400).json({ message: "Shop address is required and must not be an array" });
    }

    try {
        const result = await pool.query(
            `WITH inserted_shop AS (
            INSERT INTO Shops (shop_name, shop_address, img, owner, shop_num, description, group_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
            )
            SELECT inserted_shop.*, sg.group_name
            FROM inserted_shop
            JOIN ShopGroups sg ON inserted_shop.group_id = sg.group_id;
    `,
            [shop_name, shop_address, img, owner, shop_num, shop_description, groupId]
        );

        // Define the desired time zone
        const timeZone = 'Asia/Karachi'; // Adjust to your desired time zone

        // Map over each shop to format the date
        const shops = result.rows.map(shop => {
            // Convert the UTC date from the database to the desired time zone
            const zonedDate = moment.utc(shop.createdat).tz(timeZone);
            // Format the date to 'YYYY-MM-DD HH:mm'
            return {
                ...shop,
                createdat: zonedDate.format('DD-MM-YYYY h:mm A')
            };
        });
        res.status(200).json(shops[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Temporary Services down', error: err });
    }
};

// Get All Shops
const getAllShops = async (req, res) => {
    try {
        const result = await pool.query(`SELECT s.*, g.group_name
                    FROM Shops s
                    JOIN shopgroups g ON s.group_id = g.group_id;`);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'no shops record!' });
        }
        // Define the desired time zone
        const timeZone = 'Asia/Karachi'; // Adjust to your desired time zone

        // Map over each shop to format the date
        const shops = result.rows.map(shop => {
            // Convert the UTC date from the database to the desired time zone
            const zonedDate = moment.utc(shop.createdat).tz(timeZone);
            // Format the date to 'YYYY-MM-DD HH:mm'
            return {
                ...shop,
                createdat: zonedDate.format('DD-MM-YYYY h:mm A')
            };
        });

        // Send the formatted shops as the response
        res.status(200).json(shops);
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
        // Define the desired time zone
        const timeZone = 'Asia/Karachi'; // Adjust to your desired time zone

        // Map over each shop to format the date
        const shops = result.rows.map(shop => {
            // Convert the UTC date from the database to the desired time zone
            const zonedDate = moment.utc(shop.createdat).tz(timeZone);
            // Format the date to 'YYYY-MM-DD HH:mm'
            return {
                ...shop,
                createdat: zonedDate.format('DD-MM-YYYY h:mm A')
            };
        });

        // Send the formatted shops as the response
        res.status(200).json(shops);
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
    const { shop_name, shop_address, img, owner, shop_num, shop_description, groupId } = req.body;
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
            `WITH updated_shop AS (
                UPDATE Shops
                SET shop_name = COALESCE($1, shop_name),
                    shop_address = COALESCE($2, shop_address),
                    img = COALESCE($3, img),
                    owner = COALESCE($4, owner),
                    shop_num = COALESCE($5, shop_num),
                    description = COALESCE($6, description),
                    group_id = COALESCE($7, group_id)
                WHERE shop_id = $8
                RETURNING *
            )
            SELECT updated_shop.*, sg.group_name
            FROM updated_shop
            JOIN Shopgroups sg ON updated_shop.group_id = sg.group_id;`,
            [shop_name, shop_address, img, owner, shop_num, shop_description, groupId, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        // Define the desired time zone
        const timeZone = 'Asia/Karachi'; // Adjust to your desired time zone

        // Map over each shop to format the date
        const shops = result.rows.map(shop => {
            // Convert the UTC date from the database to the desired time zone
            const zonedDate = moment.utc(shop.createdat).tz(timeZone);
            // Format the date to 'YYYY-MM-DD HH:mm'
            return {
                ...shop,
                createdat: zonedDate.format('DD-MM-YYYY h:mm A')
            };
        });
        res.status(200).json(shops[0]);
    } catch (err) {
        console.log(err, 'error in api function')
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
