require("dotenv").config();
const db = require("./db/dbconnect.js");
const logRequest = require("./middleware/logRequest.middleware.js");
const express = require("express");
const bodyparser = require("body-parser");
const userRoutes = require("./routes/User.route.js");
const menuRoutes = require("./routes/menu.route.js");
const passport = require('./middleware/Auth.middleware.js');
const port = process.env.PORT;
const app = express();
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logRequest);


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session:false});



app.use("/user", userRoutes);
app.use("/menu",localAuthMiddleware ,menuRoutes);

app.get("/",(req, res) => {
  res.send("<h1>Welcome to patel hotels</h1>");
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
