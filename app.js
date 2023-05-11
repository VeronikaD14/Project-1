const express = require('express');
const app = express();
const {getCategory, getReview, getJson, getAllReview}=require('./controller')


app.get('/api/categories', getCategory)

app.get('/api', getJson)
 
app.get('/api/reviews/:review_id', getReview)

app.get('/api/reviews', getAllReview)

 module.exports = app