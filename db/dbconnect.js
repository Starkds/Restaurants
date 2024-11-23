const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGO_URI_LOCAL;
//const mongoURL = process.env.MONGO_URI;


mongoose.connect(mongoURL).then(() => {
    console.log('MongoDB connected successfully');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});
const db = mongoose.connection;


module.exports = db;