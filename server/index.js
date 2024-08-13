const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const users = require('./routes/users');
const employes = require('./routes/employes');
const departments = require('./routes/departments');
const app = express();
const port = 5000;

// middlewares
app.use(bodyParser.json());

// routes
// app.use('/api/employees', authenticate, employeeRoutes);
app.use('/users/auth', authRoutes);
app.use('/users', users);
app.use('/employees', employes);
app.use('/dept', departments);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to Factory Management API');
});
