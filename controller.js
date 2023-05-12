const {selectCategory, getId, getFile, sortReview}=require("./model")

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
  