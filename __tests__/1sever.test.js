const request = require('supertest');
const app = require('../app'); 
const testData = require('../db/data/test-data/index')
const seed = require('../db/seeds/seed')
const db = require('../db/connection')
const expectedData = require('../endpoints.json');



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

describe('3.5 GET /api', () => {
  it('should return an json objects', () => {


    return request(app)
     .get('/api')
      .expect(200)
      .then((res) => {
        
         expect(res.body.data).toEqual(expectedData);

      });
  });
});



describe("GET /api/reviews/3", ()=>{
  it("should return an review object from given ID with correct properties",()=>{
      return request(app).get('/api/reviews/3').expect(200).then((response)=>{
          response.body.review.forEach((reviews)=>{
            
            expect(reviews.review_id).toBe(3);

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
  it("should return an review object from given ID with correct properties",()=>{
    return request(app).get('/api/reviews/4').expect(200).then((response)=>{
        response.body.review.forEach((reviews)=>{
          
          expect(reviews.review_id).toBe(4);

        })
    })
})

it("should return Error msg if input ID is not a number",()=>{
  return request(app).get('/api/reviews/r').expect(400).then((response)=>{
    expect(response.body.msg).toBe('Invalid ID');
      

      })
  })




}) 


