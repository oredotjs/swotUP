const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validateUser} = require('../../helpers/validateUser');
const {ErrorHandler} = require('../../helpers/error');
const {logger} = require('../../utils/logs/logger');

class AuthService {}

module.exports.absolute =
    function(number) {
  if (number > 0)
    return number;
  if (number < 0)
    return -number;
  return 0;
}

const absolute = (number) => { return (number >= 0) ? number : -number; }

function greet(name) { return 'Welcome ' + name; }

getCurrencies =
    function() {
  return [ "USD", "EUR", "GBP", "EUR" ]
}

getProduct =
    (productId) => {
      return { id: productId, price: 1 }
    }

registerUser =
    function(username) {
  if (!username)
    throw new Error("username is required.");

  return {id : new Date().getTime(), username : username};
}

    // Testing an array.
    module.exports = {
  absolute,
  greet,
  getCurrencies,
  getProduct,
  registerUser
}