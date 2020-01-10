var mysql = require('mysql');
var con = mysql.createConnection({
host: "localhost",
user: "root",
password: "DVKWFccJ9",
database: "ChristmasPresents"
});

//Comments are to be found on owo,js

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var random = Math.ceil(Math.random() * 7) +1;


  var sql = "select * from presents2 where id='" + random.toString() + "'";
  console.log(sql)

  con.query(sql, function (err, result) {
      if (err) throw err;
      var path = JSON.parse(JSON.stringify(result[0]))["path"];
      console.log(path);
      // använd document.getElementById för att ställa om src på bilden till path från result
    });


});
