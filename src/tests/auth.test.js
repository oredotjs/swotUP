const auth = require('../v1/services/auth')

// Testing a number
describe('absolute', () => {
 it('should return a positive number', () => {
 const result = auth.absolute(1); // 1 is the argument, result is the value being returned.
 expect(result).toBe(1);
})
});

/*
describe('greet', () => {
 it('should return a string', () => {
  const result = auth.greet('Momo')
  expect(result).toBe('Welcome Momo');
 })
})
*/

// Testing a string
describe('greet', () => {
 it('should return a string', () => {
  const result = auth.greet('Momo')
  //expect(result).toMatch(/Momo/);
  expect(result).toContain('Momo');
 })
})

describe('getCurrencies', () => {
 it('should return an array of currencies', () => {
  const result = auth.getCurrencies();
  expect(result).toEqual(expect.arrayContaining(['USD', 'EUR']));
 })
})

describe('getProduct', () => {
 it('should return an object', () => {
  const result = auth.getProduct(1);
  //expect(result).toBe({ id: 1, price: 1 });
  //expect(result).toEqual({ id: 1, price: 1 });
  //expect(result).toMatchObject({ id: 1, price: 1 });
  expect(result).toHaveProperty( 'id', 1 );
 })
})

describe('registerUser', function () {
 it('should throw an if username is falsy', () => {
  const args = [null, undefined, NaN, '', 0, false];
  args.forEach(a => {
   expect(() => { auth.registerUser(a); }).toThrow();
  })
 })

 it('should return a user object if valid username is passed', () => {
  const result = auth.registerUser('momo')
  expect(result).toMatchObject({ username: 'momo' })
  expect(result.id).toBeGreaterThan(0)
 })
});