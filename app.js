const express = require('express');
const app = express();
const {getCategory}=require('./controller')


app.get('/api/categories', getCategory)
 
 module.exports = app