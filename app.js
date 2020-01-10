const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const path = require('path')
const app = express();
const mysql = require('mysql')

//Functions necessary to get the homepage working

const presentFunctions = require('.Jul/views/random.js')
const {getHomePage} = require('./views/index.ejs');
const port = 5000;

//Middleware

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());
app.use('/static', express.static('public'))

//Creating database connection

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'DVKWFccJ9',
    database: 'ChristmasPresents'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

//Configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'static'))); // configure express to use public folder

//Routes for the app

app.get('/index', getHomePage);
app.get('/random', getRandomPage);
app.get('/text', getTextPage);


//Set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
