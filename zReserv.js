const request = require('supertest');
const app = require('../app'); 
const testData = require('../db/data/test-data/index')
const seed = require('../db/seeds/seed')
const db = require('../db/connection')


exports.getReview =(req,res,next)=>{
  const {sort_by} = req.query
  console.log('sortby', sort_by)

  selectSort(sort_by)
  .then((reviews)=>{
      res.status(200).send({reviews:reviews})
  })
  .catch((err)=>{
      next(err)
  })
}

xports.selectSort=(sort_by = "owner",order='asc', category= "hidden-roles")=>{
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





beforeEach(() => {return seed(testData)});

afterAll(() => {return db.end()});

describe('GET /api/categories', () => {
  it('should return an array of category objects', () => {
    
    return request(app)
     .get('/api/categories')
      .expect(200)
      .then((res) => {
        
        res.body.category.forEach((category)=>{
         expect(typeof category.slug).toBe('string');

         expect(typeof category.description).toBe('string');

     })
      });
  });
});

describe("GET /api/reviews", ()=>{
  it("should return an array of reviews objects with correct properties",()=>{
      return request(app).get('/api/reviews').expect(200).then((response)=>{
          response.body.reviews.forEach((reviews)=>{
              expect(typeof reviews.title).toBe('string');
              expect(typeof reviews.designer).toBe('string'); 
              expect(typeof reviews.owner).toBe('string'); 
              expect(typeof reviews.review_img_url).toBe('string'); 
              expect(typeof reviews.category).toBe('string');
              expect(typeof reviews.created_at).toBe('string');
              expect(typeof reviews.votes).toBe('number');
             // expect(typeof reviews.comment_count).toBe('number');

          })
      })
  })
})


describe("GET /api/reviews queries ", ()=>{
  it("should return a array of valid reviews objects SORTED by title",()=>{
      return request(app).get('/api/reviews?sort_by=title').expect(200).then((response)=>{
    
      
              expect(response.body.reviews).toBeSortedBy('title');
             
          
      })
  })
})

describe("GET /api/reviews queries ", ()=>{
  it("should return a array of valid reviews objects SORTED by votes",()=>{
      return request(app).get('/api/reviews?sort_by=votes').expect(200).then((response)=>{
    
      
              expect(response.body.reviews).toBeSortedBy('votes');
             
          
      })
  })
})