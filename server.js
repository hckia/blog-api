const express = require('express');
// morgan to log HTTP layer
const morgan = require('morgan');
// parse JSON data
const bodyParser = require('body-parser');

//import model plus endpoits
const {BlogPosts} = require('./model');

const jsonParser = bodyParser.json();
const app = express();

//use the http layerl og
app.user(morgan('common'));