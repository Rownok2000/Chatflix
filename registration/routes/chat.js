var express = require('express');

var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://ahasan:Registrazione@cluster0.0pydj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

router.get('/savechat/:group/:message', function(req, res) {
    var group = req.params.group;
    var username = req.params.username;
     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        if (err) {
            res.send({response:err});
        }else{
        const collection = client.db("progetto").collection("groups");
        collection.insertOne({ name: `${group}`, [chats] :  `${message}`});
        res.send({response:"ok"});
        }
    });
});
