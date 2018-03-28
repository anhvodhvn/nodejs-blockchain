var express = require('express');
var app = express();
var Pool = require('pg-pool');
 
var config = {
	host: 'localhost',
    database: 'epost', 
    port: 5432,
    user: 'docker',
	password: 'docker'
};
var pool = new Pool(config);

app.get('/', function (req, res, next) {	
    res.status(200).send(true);
});

app.get('/product', function (req, res, next) {	
    pool.connect(function(err,client,done) {
       if(err){
           console.log("not able to get connection "+ err);
           res.status(5432).send(err);
       } 
       client.query('SELECT * FROM product;', function(err,result) {
           done(); // closing the connection;
           if(err){
               console.log(err);
               res.status(500).send(err);
           }
		   console.log('- result:', result);
           res.status(200).send(result.rows);
       });
    });
    //res.status(200).send(['Sony Vaio', 'IBM T60', 'MacBook Pro']);
});
 
app.listen(4000, function () {
    console.log('Server is running... on Port 4000');
});
