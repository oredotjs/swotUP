const supertest = require('supertest');
const app = require('../app');
const testApi = supertest(app);
const pool = require('../configs/db');
const bcrypt = require('bcryptjs');

beforeAll(async () => {
 await pool.query("DELETE FROM users");
})

describe('/api/auth/signup', () => {
 it('should create an account for the user', async () => {
  const res = await testApi.post('/api/auth/signup').send({
   email: "email@email.com",
   password: "secret",
   fullname: "test db",
   username: "test",
  })
  expect(res.body).toHaveProperty("userId");
  expect(res.body).toHaveProperty("cartId");
  expect(res.statusCode).toBe(201);
 })

 describe("throw error if username or email is taken", () => {
  beforeAll(async () => {
   await pool.query("DELETE FROM users");
   const hashedPassword = await bcrypt.hash("secret", 1);
   await pool.query("INSERT INTO users(username, password, email, fullname) VALUES ($1, $2, $3, $4) returning user_id",
   ["test", hashedPassword, "email@email.com", "test db"])
  })

  it("should throw an error if the username is taken", async () => {
   const res = await testApi.post("/api/auth/signup").send({
    email: "odunsiolakunbi@yahoo.com", password: "secret",
    fullname: "test db", username: "test",}).expect(401);
    
    expect(res.body).toHaveProperty("message", "username taken")
    expect(res.body).toHaveProperty("status", "error");
   })

   it("should throw an error if email is taken", async () => {
    const res = await testApi.post('/api/auth/signup').send({
     email: "email@email.com", password: "secret", fullname: "test db",
     username: "newtest"
    }).expect(401);

    expect(res.body).toHaveProperty("message", "email taken");
    expect(res.body).toHaveProperty("status", "error");
   })
 })
})

afterAll(async () => {
 await pool.end();
});