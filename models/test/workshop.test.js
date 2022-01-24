const Workshop = require('../workshop.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Workshop', () => {
  it('should throw an error if any arg missing', () => {
    const workshop1 = new Workshop({});
    workshop1.validate((err) => {
      expect(err.errors.name).to.exist;
      expect(err.errors.concertId).to.exist;
    });
  });

  it('should throw an error if type of any key is invalid', () => {
    const cases = [{}, []];
    for (let value of cases) {
      const workshop1 = new Workshop({
        name: value,
        concertId: value,
      });
      workshop1.validate((err) => {
        expect(err.errors.name).to.exist;
        expect(err.errors.concertId).to.exist;
      });
    }
  });

  it('should not throw an error if everything is OK', () => {
    const workshop1 = new Workshop({
      name: 'name1',
      concertId: 'someid',
    });

    workshop1.validate((err) => {
      expect(err).to.not.exist;
    });
  });
});
