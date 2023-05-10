const {selectCategory}=require("./model")

exports.getCategory=(req,res,next)=>{
    
    selectCategory()
    .then((category)=>{
        res.status(200).send({category:category})
    })
    .catch((err)=>{
        next(err)
    })
}