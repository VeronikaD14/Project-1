const {selectCategory, getId, getFile, sortReview, selectComment, placeAComment, changeVotes }=require("./model")

exports.getCategory=(req,res,next)=>{
    
    selectCategory()
    .then((category)=>{
        res.status(200).send({category:category})
    })
    .catch((err)=>{
        next(err)
    })
}

exports.getJson = (req, res, next) => {
    getFile()
      .then((data) => {
        res.status(200).send({ data });
      })
      .catch((err) => {
        next(err);
      });
  };
  
exports.getReview =(req,res,next)=>{
    const {review_id} = req.params

    getId(review_id) 
    .then((review)=>{
        res.status(200).send({review:review})
    })
    
    .catch((err)=>{
        next(err)
    })
}

exports.getAllReview = (req,res,next)=>{
  
    sortReview()
    .then((reviews)=>{
        res.status(200).send({reviews:reviews})
    })
    .catch((err)=>{
        next(err)
    })
  }

  exports.getComments =(req,res,next)=>{
    const {review_id} = req.params

    selectComment(review_id) 
    .then((review)=>{
        res.status(200).send({review:review})
    })
    
    .catch((err)=>{
        next(err)
    })
}

exports.postAComment = (request, response, next) => {
    placeAComment(request.params, request.body)
      .then((addedComment) => {
        response.status(201).send({ addedComment });
      })
      .catch((err) => {
        next(err);
      });
  };
  
  exports.updateVotes = (request, response, next) => {
    changeVotes(request.params, request.body)
      .then((editedReview) => {
        response.status(200).send({editedReview});
      })
      .catch((err) => {
        next(err);
      });
   
  };