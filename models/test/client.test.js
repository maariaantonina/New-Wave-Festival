const Client = require('../client.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Client', () => {
  it('should throw an error if any arg missing', () => {
    const client1 = new Client({});
    client1.validate((err) => {
      expect(err.errors.name).to.exist;
      expect(err.errors.email).to.exist;
    });
  });

  it('should throw an error if type of any key is invalid', () => {
    const cases = [{}, []];
    for (let value of cases) {
      const client1 = new Client({
        name: value,
        email: value,
      });
      client1.validate((err) => {
        expect(err.errors.name).to.exist;
        expect(err.errors.email).to.exist;
      });
    }
  });

  it('should not throw an error if everything is OK', () => {
    const client1 = new Client({
      name: 'John Doe',
      email: 'john@domain.pl',
    });

    client1.validate((err) => {
      expect(err).to.not.exist;
    });
  });

  after(() => {
    mongoose.models = {};
  });
});
