const bcrypt = require('bcryptjs');
const pool = require('../configs/db');
const supertest = require('supertest');
const app = require('../app');
const testApi = supertest(app);
const jwt = require('jsonwebtoken');
const { dbUSERS } = require('../helpers/test_helper');

beforeEach(async () => {
 const hashedPassword = await bcrypt.hash("secret", 1);

 // Create an Admin Account.
 await pool.query("INSERT INTO users (username, password, email, fullname, roles) VALUES 
 ($1, $2, $3, $4, $5) RETURNING user_id", [ "admin", hashedPassword, "admin@email.com", 
 "admin", "{\"customer\", \"admin\"}"])

 // Create a Customer Account.
 await pool.query("INSERT INTO users(username, password, email, fullname) VALUES 
 ($1, $2, $3, $4) RETURNING user_id", ["customer", hashedPassword, "customer@email.com", "customer"])

})

afterEach(async () => {
 await pool.query("DELETE FROM users")
})

describe("User Controller", () => {
 describe("Add New User", () => {
  it("should create a new admin(user)", async () => {
   const usersAtStart = await dbUSERS()
   const hashedPassword = await bcrypt.hash("secret", 1)
   
   const res = await testApi.post('/api/users').send({
    fullname: "John Doe", hashedPassword, username: "johnny", email: "johnny@gmail.com"
   }).expect(201)//.set("auth-token", adminAuth.token);

   const usersAtEnd = await testApi.get('/api/users')//.set('auth-token', adminAuth.token);

   expect(res.body).toHaveProperty("status", "success");
   expect(res.body).toHaveProperty("user");
   expect(res.body.user).not.toHaveProperty("password");
   expect(usersAtEnd.body).toHaveLength(usersAtStart.length + 1);
  })

  it("should not create a new user if user is not an admin", async () => {
   const usersAtStart = await dbUSERS()
   const res = await testApi.post('api/users').send({
    fullname: "John Smith", password: "hashedPassword", username: "johnny",
    email: "johnny@example.com",
   }).expect(401)//.set("auth-token", customerAuth.token);

   const usersAtEnd = await testApi.get('api/users')//.set('auth-token', adminAuth.token);

   expect(res.body).toHaveProperty("status", "error");
   expect(res.body).not.toHaveProperty("user");
   expect(res.body).toHaveProperty("message", "require admin role");
   expect(usersAtEnd.body).toHaveLength(usersAtStart.length);
  })
 })
})