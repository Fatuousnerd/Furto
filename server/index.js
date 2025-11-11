const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

//Import Routes
const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');

mongoose.connect(`${process.env.CONNECTION_STRING_LOCALHOST}/${process.env.DB}`,)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error', err));

//Use Routes
app.use(`/api/v1/auth`, authRoutes);
app.use(`/api/v1/shop`, shopRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running. Port: ${process.env.PORT}`);
});