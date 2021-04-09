var express = require('express');

var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://ahasan:Registrazione@cluster0.0pydj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

/* POST */
router.post('/', function(req, res) {
    var username = req.body1.username;
    var pwd = req.body1.password;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        var len;
        const collection = client.db("progetto").collection("users");
        collection.find({ 'username': `${username}` }).toArray((err, result) => {
            if (err) console.log(err.message);
            else {
                len = result.length;
                if(len != 1) {
                    client.close();
                    res.send({ status: "Utente non registrato" });
                }
            }
        });

        if (len == 1) {
            var myobj = { username: `${username}`, password: `${pwd}` };
            collection.findOne(myobj, function(err, res) {
            console.log(`Accesso Utente ${username}avvenuto correttamente!`);
            });

            setTimeout(function () {
                res.send({ status: "done" });
                client.close();
            }, 500);
        }
    });

});

module.exports = router;