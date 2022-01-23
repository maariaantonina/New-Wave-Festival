const Concert = require('../concert.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Concert', () => {
  it('should throw an error if any arg missing', () => {
    const concert1 = new Concert({});
    concert1.validate((err) => {
      expect(err.errors.performer).to.exist;
      expect(err.errors.genre).to.exist;
      expect(err.errors.price).to.exist;
      expect(err.errors.day).to.exist;
      expect(err.errors.image).to.exist;
    });
  });

  it('should throw an error if type of any key is invalid', () => {
    const cases = [{}, []];
    for (let value of cases) {
      const concert1 = new Concert({
        performer: value,
        genre: value,
        price: value,
        day: value,
        image: value,
      });
      concert1.validate((err) => {
        expect(err.errors.performer).to.exist;
        expect(err.errors.genre).to.exist;
        expect(err.errors.price).to.exist;
        expect(err.errors.day).to.exist;
        expect(err.errors.image).to.exist;
      });
    }
  });

  it('should not throw an error if everything is OK', () => {
    const concert1 = new Concert({
      performer: 'John Doe',
      genre: 'jazz',
      price: 11,
      day: 1,
      image: 'abc',
    });

    concert1.validate((err) => {
      expect(err).to.not.exist;
    });
  });
});
