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
    const {sort_by} = req.query

    selectSort(sort_by)
    .then((reviews)=>{
        res.status(200).send({reviews:reviews})
    })
    .catch((err)=>{
        next(err)
    })
}