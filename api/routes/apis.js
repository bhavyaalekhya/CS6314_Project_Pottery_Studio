var express = require('express');
var router = express.Router();
var Mongoclient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;
const { app, db } = require('../server.js');

var CONNECTION_STRING = "mongodb+srv://root:root@pottery-studio.edqxxug.mongodb.net/?retryWrites=true&w=majority";

var DATABASENAME = "studioDb";
var database;

Mongoclient.connect(CONNECTION_STRING, (error,client) => {
        database = client.db(DATABASENAME);
        console.log("Mongo DB Connection Successful");
})

// GET all inventory with search and filter
router.get('/', function(req,res){
        res.redirect('/dashboard');
});

// Displaying Inventory
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

// Get one product from inventory
router.get('/dashboard/:id', function(req, res) {
    try{
        database.collection("Inventory").find({ "_id" : ObjectId(req.params.id) }).toArray((err, result) => {  // Change 'error' to 'err'
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

// Update one product from inventory
router.put('/dashboard/:id', async (req, res) => {
    try {
        // Get the updated fields and the id
        const { name, description, type, count, imgPath, imgDescription } = req.body;

        console.log(req.params.id + ", " + name + ", update");
  
        // Update the requested product
        let update = database.collection("Inventory").updateOne({ "_id" : ObjectId(req.params.id) }, { $set: { 
            description: description, name: name, type: type, count: count,
            image: { path: imgPath, description: imgDescription } } });
        
        // If the attempt is successful, send the update
        console.log("All Updates Completed");
        res.send(update);
    
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }  
});

// Displaying A User
router.get('/api/users', function(req, res) {
    try{
        //Make this for a logged in user
        var usrEmail = "john.doe@example.com";
        database.collection("Users").find({email: usrEmail}).toArray((err, result) => {  // Change 'error' to 'err'
            if (err) {
                console.error(err);
                return res.status(500);//.render('error', { error: err });
            }
            if (!result) {
                res.render('error', { error: "No items found" });
            }
            res.send(result[0]);
        })
    }
    // Fetch all entries in inventory based on the constructed query
    catch(error){
        console.log("error:", error);
        res.send(error);
    }
});

module.exports = router;