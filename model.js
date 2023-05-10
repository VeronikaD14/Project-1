const connection = require('/home/veronika/northcoders/backend/be-nc-games/db/connection.js');

exports.selectCategory=()=>{
    
   
       // return Promise.reject({ status: 400, msg: "Invalid sort query"})
    

    return connection.query(`SELECT * FROM categories;`)
    .then((result)=>{
        return result.rows;
    })
}
