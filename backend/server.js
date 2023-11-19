const cors = require('cors');
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB();

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // Enable credentials (cookies, authorization headers, etc.)
  }));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/invoices', require('./routes/invoiceRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on ${port}`))