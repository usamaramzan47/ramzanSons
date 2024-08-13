const getAllUsers = async (req, res) => {
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'select',
            [username, hashedPassword, role_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    getAllUsers,
}