const connection = require('/home/veronika/northcoders/backend/be-nc-games/db/connection.js');
const fs = require('fs');

exports.selectCategory=()=>{
    

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



exports.selectSort=(review_id)=>{

 
    const regex = /^\d+$/; 
  
    if (!regex.test(review_id)) { 
      return Promise.reject({ status: 400, msg: 'Invalid ID' });
    }

    return connection.query(`SELECT * FROM reviews Where review_id = ${review_id};`)
    .then((result)=>{
        return result.rows;
    })
}


exports.sortReview = () => {
  return connection.query(`
    SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url,
           reviews.created_at, reviews.votes, reviews.designer, COUNT(comments.comment_id) AS comment_count
    FROM reviews
    LEFT JOIN comments ON reviews.review_id = comments.review_id
    GROUP BY reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url,
             reviews.created_at, reviews.votes, reviews.designer
    ORDER BY reviews.created_at DESC;
  `).then((result) => {
    return result.rows;
  });
};
