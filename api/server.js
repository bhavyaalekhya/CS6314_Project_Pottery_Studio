var Express = require("express");
const cors = require('cors');
const methodOverride = require('method-override');
const createError = require('http-errors');
const PORT = process.env.PORT || 5000;
const connectDB =require("./config/db.js") ;

var indexRouter = require('./routes/apis');

var app = Express();
app.use(cors());
app.use(Express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Add this line
app.use(Express.json());
connectDB();

app.use('/', indexRouter);
// Add your routes/pages here

//###############
//DATABASE STUFF

// var CONNECTION_STRING = "mongodb+srv://root:root@bookstore.algdkrr.mongodb.net/?retryWrites=true&w=majority";
// var DATABASENAME = "BookStore";
var CONNECTION_STRING = "mongodb+srv://root:root@pottery-studio.edqxxug.mongodb.net/?retryWrites=true&w=majority";
var DATABASENAME = "studioDb";
var database;

app.listen(5000, () => {
    console.log(`App running on port: `+PORT);
})

module.exports = { database, app };