const connection = require('./db/connection');
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


exports.getId = (review_id) => {

const regex = /^\d+$/;

if (!regex.test(review_id)) {
  return Promise.reject({ status: 400, msg: 'Invalid ID' });
} else if (review_id > 100) {
  return Promise.reject({ status: 404, msg: 'Not Found' });
} else {
  const query = {
    text: 'SELECT * FROM reviews WHERE review_id = $1',
    values: [review_id],
  };
  return connection.query(query)
    .then((result) => {
      return result.rows;
    });
}
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

exports.selectComment = (review_id) => {

  const query = {
    text: 'SELECT * FROM comments WHERE review_id = $1',
    values: [review_id],
  };
  return connection.query(query)
    .then((result) => {
      return result.rows;
    });
}

exports.placeAComment = ({ review_id }, { username, body }) => {
  if (!username || !body) {
    return Promise.reject({
      status: 400,
      msg: "Required fields not been completed",
    });
  }

  const regexNum = /^[0-9]+$/;
  if (!regexNum.test(review_id)) {
    return Promise.reject({ status: 400, msg: "Invalid review ID provided" });
  }
  return connection
    .query(
      `INSERT INTO comments ( body, review_id,author)VALUES ( $1, $2 , $3 ) returning *;`,
      [body, review_id, username]
    )
    .then(({ rows }) => {
      return rows[0];
    })
    .catch((err) => {
      if (err.constraint === "comments_author_fkey") {
        return Promise.reject({
          status: 400,
          msg: "Supplied username is not registerd",
        });
      }
      return err;
    });
};

exports.changeVotes = ({ review_id }, { inc_votes }) => {
  const regexNum = /^[0-9]+$/;
  const regexVote = /^-[0-9]+|^[0-9]+/;
  if (!regexNum.test(review_id)) {
    return Promise.reject({ status: 400, msg: "Invalid review ID provided" });
  }
  if (!regexVote.test(inc_votes)) {
    return Promise.reject({ status: 400, msg: "Invalid vote data provided" });
  }

  return connection
    .query(
      `UPDATE reviews
  SET votes = votes + $2
  WHERE review_id = $1 returning *`,
      [review_id, inc_votes]
    )
    .then((newReview) => {
    return newReview.rows
    }).catch((err)=>{
      return err
    })
};