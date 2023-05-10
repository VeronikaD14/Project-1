const connection = require('/home/veronika/northcoders/backend/be-nc-games/db/connection.js');
const fs = require('fs');

exports.selectCategory=()=>{
    
   
       // return Promise.reject({ status: 400, msg: "Invalid sort query"})
    

    return connection.query(`SELECT * FROM categories;`)
    .then((result)=>{
        return result.rows;
    })
}



exports.getFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('endpoints.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};



exports.selectSort=(sort_by = "owner",order='asc', category= "hidden-roles")=>{
    const validSortQueries = [ "title",
    "designer",
    "owner",
    "review_img_url",
    "category",
    "created_at",
    "votes",
    "comment_count"];
    const validOrder=["asc","desc"]

    
    if(!validSortQueries.includes(sort_by)){
        return Promise.reject({ status: 400, msg: "Invalid sort query"})
    }

    if(!validOrder.includes(order)){
        return Promise.reject({ status: 400, msg: "Invalid order query"})
    }

    return connection.query(`SELECT * FROM reviews ORDER BY ${sort_by} ${order};`)
    .then((result)=>{
        return result.rows;
    })
}