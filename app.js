const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require("cors");
const methodOverride = require('method-override');
const session = require('express-session');        
const bookRoute = require("./route/bookRoute");
const authRoute = require("./route/authRoute");     
require('dotenv').config();
connectDB();

const app = express();

app.use(express.static('public'));
app.use(cors());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(session({
    secret: process.env.SESSION_SECRET || "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } 
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.use("/auth", authRoute);       
app.use("/", bookRoute);           
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listen at http://localhost:${PORT}`)
});