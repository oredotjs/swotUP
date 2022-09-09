const bcrypt = require('bcryptjs');
const jest = require('jest');
const supertest = require('supertest');
const app = require('../../app');
const apiTest = supertest(app);
const jwt = require('jsonwebtoken');
