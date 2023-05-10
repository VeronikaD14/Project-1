const request = require('supertest');
const app = require('../app'); 
const testData = require('../db/data/test-data/index')
const seed = require('../db/seeds/seed')
const db = require('../db/connection')


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

   const expectedData = {
    "GET /api": {
      "description": "serves up a json representation of all the available endpoints of the api"
    },
    "GET /api/categories": {
      "description": "serves an array of all categories",
      "queries": [],
      "exampleResponse": {
        "categories": [
          {
            "description": "Players attempt to uncover each other's hidden role",
            "slug": "Social deduction"
          }
        ]
      }
    },
    "GET /api/reviews": {
      "description": "serves an array of all reviews",
      "queries": ["category", "sort_by", "order"],
      "exampleResponse": {
        "reviews": [
          {
            "title": "One Night Ultimate Werewolf",
            "designer": "Akihisa Okui",
            "owner": "happyamy2016",
            "review_img_url": "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            "category": "hidden-roles",
            "created_at": "2018-05-30T15:59:13.341Z",
            "votes": 0,
            "comment_count": 6
          }
        ]
      }
    }
  }

    return request(app)
     .get('/api')
      .expect(200)
      .then((res) => {
        
         expect(res.body.data).toEqual(expectedData);

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


