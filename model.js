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
