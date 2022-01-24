const Concert = require('../concert.model');

const expect = require('chai').expect;
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer = undefined;

describe('Concert', () => {
  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (let key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  describe('Reading data', () => {
    beforeEach(async () => {
      const testConcertOne = new Concert({
        performer: 'John Doe',
        genre: 'rock',
        price: 11,
        day: 1,
        image: 'abc',
      });
      await testConcertOne.save();

      const testConcertTwo = new Concert({
        performer: 'Jane Doe',
        genre: 'jazz',
        price: 22,
        day: 2,
        image: 'abc',
      });
      await testConcertTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const concerts = await Concert.find();
      const expectedLength = 2;
      expect(concerts.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "name" with "findOne" method', async () => {
      const concert = await Concert.findOne({ performer: 'John Doe' });
      expect(concert.performer).to.be.equal('John Doe');
    });

    afterEach(async () => {
      await Concert.deleteMany();
    });
  });

  describe('Creating data', () => {
    it('should insert new document with "insertOne" method', async () => {
      const concert = new Concert({
        performer: 'John Doe',
        genre: 'rock',
        price: 11,
        day: 1,
        image: 'abc',
      });
      await concert.save();
      const savedConcert = await Concert.findOne({
        performer: 'John Doe',
      });
      expect(savedConcert).to.not.be.null;
    });

    after(async () => {
      await Concert.deleteMany();
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testConcertOne = new Concert({
        performer: 'John Doe',
        genre: 'rock',
        price: 11,
        day: 1,
        image: 'abc',
      });
      await testConcertOne.save();

      const testConcertTwo = new Concert({
        performer: 'Jane Doe',
        genre: 'jazz',
        price: 22,
        day: 2,
        image: 'abc',
      });
      await testConcertTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Concert.updateOne(
        { performer: 'Jane Doe' },
        { $set: { performer: 'Jane Roe' } }
      );
      const updatedConcert = await Concert.findOne({
        name: 'Jane Roe',
      });
      expect(updatedConcert).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const concert = await Concert.findOne({ performer: 'Jane Doe' });
      concert.name = 'Jane Roe';
      await concert.save();

      const updatedConcert = await Concert.findOne({
        name: 'Jane Roe',
      });
      expect(updatedConcert).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Concert.updateMany({}, { $set: { performer: 'Updated!' } });
      const concerts = await Concert.find();
      expect(concerts[0].performer).to.be.equal('Updated!');
      expect(concerts[1].performer).to.be.equal('Updated!');
    });

    afterEach(async () => {
      await Concert.deleteMany();
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testConcertOne = new Concert({
        performer: 'John Doe',
        genre: 'rock',
        price: 11,
        day: 1,
        image: 'abc',
      });
      await testConcertOne.save();

      const testConcertTwo = new Concert({
        performer: 'Jane Doe',
        genre: 'jazz',
        price: 22,
        day: 2,
        image: 'abc',
      });
      await testConcertTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Concert.deleteOne({ performer: 'John Doe' });
      const removedConcert = await Concert.findOne({
        performer: 'John Doe',
      });
      expect(removedConcert).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const concert = await Concert.findOne({ performer: 'John Doe' });
      await concert.remove();
      const removedConcert = await Concert.findOne({
        performer: 'John Doe',
      });
      expect(removedConcert).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Concert.deleteMany();
      const concerts = await Concert.find();
      expect(concerts.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Concert.deleteMany();
    });
  });
});
