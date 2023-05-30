const express = require('express');
const app = express();
const {getCategory, getReview, getJson, getAllReview}=require('./controller')
const cors = require('cors')

app.use(cors())

app.get('/api/categories', getCategory)

app.get('/api', getJson)
 
app.get('/api/reviews/:review_id', getReview)

app.get('/api/reviews', getAllReview)

  app.use((err, req, res, next) => {

 if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
      }
       else { next(err)};
     
  });

 module.exports = app