const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const app = express();
const port = 5000;
// const pool = require('./config/db.js');

// middlewares
app.use(bodyParser.json());


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// routes redirect
app.use('/users/auth', authRoutes);



app.get('/', (req, res) => {
    res.send('Welcome to Factory Management API');
});
