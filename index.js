require('dotenv').config();
const db = require('./db/dbconnect.js');
const express = require('express');
const bodyparser = require('body-parser');
const userRoutes = require('./routes/user.Route.js');
const menuRoutes = require('./routes/menu.route.js');
const port =  process.env.PORT;
const app = express();

app.use(bodyparser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/user', userRoutes);
app.use('/menu', menuRoutes);




app.listen(port ,()=>{
    console.log(`server listening on port ${port}`);
})




