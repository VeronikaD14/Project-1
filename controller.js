const {selectCategory, selectSort, getFile}=require("./model")

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

    selectSort(review_id)
    .then((review)=>{
        res.status(200).send({review:review})
    })
    
    .catch((err)=>{
        next(res.status(400).send({msg: 'Invalid ID'}))
    })
}