
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser')
const data = require('./selectData.js')

const app = express();

//Establish connection with the database
app.get("/index.ejs",function(req, res){
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "DVKWFccJ9",
  database: "ChristmasPresents"
  });

//Randomiser for the pick of the right present
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var random = Math.ceil(Math.random() * 7) +1;

    //Picks out one random id out of 8
    var sql = "select * from presents2 where id='" + random.toString() + "'";
    console.log(sql)

    //Puts right values into variables to make it possible to see the present on the page
    con.query(sql, function (err, result) {
        if (err) throw err;
        var rows = JSON.parse(JSON.stringify(result[0]));
        var path = rows["path"];
        var name = rows["name"];
        var source = rows["source"];

        // använd document.getElementById för att ställa om src på bilden till path från result
      });


  });

  res.render(__dirname + "/index.ejs",{
    result: path, name: name, source: source
  });
});

app.listen(3000);
