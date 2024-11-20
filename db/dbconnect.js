const mongoose = require('mongoose');


const mongoURL = 'mongodb://localhost:27017/restaurant'



mongoose.connect(mongoURL).then(() => {
    console.log('MongoDB connected successfully');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});
const db = mongoose.connection;


module.exports = db;