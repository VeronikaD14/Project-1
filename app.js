const express = require('express');
const app = express();
const {getCategory, getReview, getJson}=require('./controller')


app.get('/api/categories', getCategory)

app.get('/api', getJson)
 
app.get('/api/reviews', getReview)

 module.exports = app