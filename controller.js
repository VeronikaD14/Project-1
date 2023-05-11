const {selectCategory, selectSort, getFile, sortReview}=require("./model")

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

exports.getAllReview = (req,res,next)=>{
    const {sort_by} = req.query
    console.log('sortby', sort_by)
  
    sortReview(sort_by)
    .then((reviews)=>{
        res.status(200).send({reviews:reviews})
    })
    .catch((err)=>{
        next(err)
    })
  }
  