const db = require('./db/dbconnect.js');
const express = require('express');
const bodyparser = require('body-parser');
const userRoutes = require('./routes/User.route.js');
const menuRoutes = require('./routes/menu.route.js');

const app = express();

app.use(bodyparser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/user', userRoutes);
app.use('/menu', menuRoutes);




app.listen(3000 ,()=>{
    console.log('server listening on port 3000');
})




