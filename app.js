const express = require('express');
const app = express();
const {getCategory, getReview, getJson, getAllReview, getComments, postAComment, updateVotes}=require('./controller')
const cors = require('cors')

app.use(cors())

app.use(express.json());

app.get('/api/categories', getCategory)

app.get('/api', getJson)
 
app.get('/api/reviews/:review_id', getReview)

app.get('/api/reviews', getAllReview)

app.get('/api/reviews/:review_id/comments', getComments)

app.post("/api/reviews/:review_id/comments", postAComment)

app.patch("/api/reviews/:review_id", updateVotes)

  app.use((err, req, res, next) => {

 if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
      }
       else { next(err)};
     
  });

 module.exports = app