const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const users = require('./routes/users');
const employes = require('./routes/employes');
const departments = require('./routes/departments');
const products = require('./routes/products');
const shops = require('./routes/shops');
const shopPrices = require('./routes/shopPrices');
const orders = require('./routes/orders');
const orderDetails = require('./routes/orderDetails');
const discounts = require('./routes/discounts');
const cors = require('cors');
// const authenticate = require('./middlewares/auth');

const app = express();
const port = 5000;

// middlewares
app.use(bodyParser.json());
app.use(cors()); // use to allow communicate with frontend

// routes
// app.use('/api/employees', authenticate, employeeRoutes);
app.use('/users/auth', authRoutes);
app.use('/users', users);
app.use('/employees', employes);
app.use('/dept', departments);
app.use('/products', products);
app.use('/shops', shops);
app.use('/shopPrices', shopPrices);
app.use('/orders', orders);
app.use('/orderDetails', orderDetails);
app.use('/discounts', discounts);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to Factory Management API');
});
