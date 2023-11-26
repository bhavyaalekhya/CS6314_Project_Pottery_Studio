var express = require('express');
var router = express.Router();
var Mongoclient = require("mongodb").MongoClient;
const { app, db } = require('../server.js');

var CONNECTION_STRING = "mongodb+srv://root:root@pottery-studio.edqxxug.mongodb.net/?retryWrites=true&w=majority";

var DATABASENAME = "studioDb";
var database;

Mongoclient.connect(CONNECTION_STRING, (error,client) => {
        database = client.db(DATABASENAME);
        console.log("Mongo DB Connection Successful");
})

// GET all games with search and filter
router.get('/', function(req,res){
        res.redirect('/dashboard');
});

//Displaying Inventory
router.get('/dashboard', function(req, res) {
    try{
        database.collection("Inventory").find({}).toArray((err, result) => {  // Change 'error' to 'err'
            if (err) {
                console.error(err);
                return res.status(500);//.render('error', { error: err });
            }
            if (!result) {
                res.render('error', { error: "No items found" });
            }
            res.send(result);
        })
    }
    // Fetch all entries in inventory based on the constructed query
    catch(error){
        console.log("error:", error);
        res.send(error);
    }
});

module.exports = router;