require("dotenv").config();
const db = require("./db/dbconnect.js");
const express = require("express");
const bodyparser = require("body-parser");
const userRoutes = require("./routes/User.route.js");
const menuRoutes = require("./routes/menu.route.js");
const passport = require("./services/Auth.middleware.js");
const port = process.env.PORT;
const app = express();
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use("/user", userRoutes);
app.use("/menu",menuRoutes);

app.get("/",(req, res) => {
  res.send("<h1>Welcome to patel hotels</h1>");
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
