const request = require('supertest');
const app = require('../app'); 
const testData = require('../db/data/test-data/index')
const seed = require('../db/seeds/seed')
const db = require('../db/connection')

beforeEach(() => {return seed(testData)});

afterAll(() => {return db.end()});
describe('GET /api/categories', () => {
  it('should return an array of category objects', () => {
    console.log('stering')
    return request(app)
     .get('/api/categories')
      .expect(200)
      .then((res) => {
        console.log(res.body)
       // res.body.category.forEach((category)=>{
       //   expect(typeof category.slug).toBe('string');

       //   expect(typeof category.description).toBe('string');

   //   })
      });
  });
});

