const Workshop = require('../workshop.model');
const Concert = require('../concert.model');

const expect = require('chai').expect;
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer = undefined;

describe('Workshop', () => {
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
        _id: '5d9f1140f10a81216cfd4408',
      });
      await testConcertOne.save();

      const testConcertTwo = new Concert({
        performer: 'Jane Doe',
        genre: 'jazz',
        price: 22,
        day: 2,
        image: 'abc',
        _id: '5d9f1159f81ce8d1ef2bee38',
      });
      await testConcertTwo.save();

      const testWorkshopOne = new Workshop({
        name: 'name1',
        concertId: '5d9f1140f10a81216cfd4408',
      });
      await testWorkshopOne.save();
      const testWorkshopTwo = new Workshop({
        name: 'name2',
        concertId: '5d9f1159f81ce8d1ef2bee38',
      });
      await testWorkshopTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const workshops = await Workshop.find();
      const expectedLength = 2;
      expect(workshops.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "name" with "findOne" method', async () => {
      const workshop = await Workshop.findOne({ name: 'name1' });
      expect(workshop.name).to.be.equal('name1');
    });

    it('should return a proper document by "concert name" with "find" method', async () => {
      const concert = await Concert.findOne();
      const workshop = await Workshop.findOne()
        .populate({
          path: 'concertId',
          match: { name: concert.name },
        })
        .exec();
      expect(workshop.concertId.performer).to.be.equal(concert.performer);
    });

    afterEach(async () => {
      await Workshop.deleteMany();
      await Concert.deleteMany();
    });
  });

  describe('Creating data', () => {
    before(async () => {
      const testConcertOne = new Concert({
        performer: 'John Doe',
        genre: 'rock',
        price: 11,
        day: 1,
        image: 'abc',
        _id: '5d9f1140f10a81216cfd4408',
      });
      await testConcertOne.save();
    });

    it('should insert new document with "insertOne" method', async () => {
      const concert = await Concert.findOne({ name: 'John Doe' });
      const workshop = new Workshop({
        name: 'name1',
        concertId: concert._id,
      });
      await workshop.save();
      const savedWorkshop = await Workshop.findOne({
        name: 'name1',
      }).populate('concertId');
      expect(savedWorkshop).to.not.be.null;
      expect(savedWorkshop.name).to.be.equal('name1');
    });

    afterEach(async () => {
      await Workshop.deleteMany();
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
        _id: '5d9f1140f10a81216cfd4408',
      });
      await testConcertOne.save();

      const testConcertTwo = new Concert({
        performer: 'Jane Doe',
        genre: 'jazz',
        price: 22,
        day: 2,
        image: 'abc',
        _id: '5d9f1159f81ce8d1ef2bee38',
      });
      await testConcertTwo.save();

      const testWorkshopOne = new Workshop({
        name: 'name1',
        concertId: '5d9f1140f10a81216cfd4408',
      });
      await testWorkshopOne.save();
      const testWorkshopTwo = new Workshop({
        name: 'name2',
        concertId: '5d9f1159f81ce8d1ef2bee38',
      });
      await testWorkshopTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Workshop.updateOne(
        { name: 'name1' },
        { $set: { name: '=name1=' } }
      );
      const updatedWorkshop = await Workshop.findOne({
        name: '=name1=',
      });
      expect(updatedWorkshop).to.not.be.null;
    });

    it('should properly update one document with "updateOne" method - concert info change', async () => {
      const concert = await Concert.findOne({ performer: 'Jane Doe' });
      await Workshop.updateOne(
        { name: 'name1' },
        { $set: { concertId: concert._id } }
      );
      const updatedWorkshop = await Workshop.findOne({
        concertId: concert._id,
      }).populate('concertId');
      expect(updatedWorkshop).to.not.be.null;
      expect(updatedWorkshop.concertId.performer).to.be.equal('Jane Doe');
    });

    it('should properly update one document with "save" method', async () => {
      const workshop = await Workshop.findOne({ name: 'name1' });
      workshop.name = '=updated name=';
      await workshop.save();

      const updatedWorkshop = await Workshop.findOne({
        name: '=updated name=',
      });
      expect(updatedWorkshop).to.not.be.null;
    });

    it('should properly update one document with "save" method - concert info change', async () => {
      const concert = await Concert.findOne({ performer: 'John Doe' });
      const concert2 = await Concert.findOne({ performer: 'Jane Doe' });
      const workshop = await Workshop.findOne({ concertId: concert._id });
      workshop.concertId = concert2._id;
      await workshop.save();

      const updatedWorkshop = await Workshop.findOne({
        concertId: concert2._id,
      }).populate('concertId');

      expect(updatedWorkshop).to.not.be.null;
      expect(updatedWorkshop.concertId.performer).to.be.equal('Jane Doe');
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Workshop.updateMany(
        {},
        { $set: { name: 'Singing in the shower' } }
      );
      const workshops = await Workshop.find();
      expect(workshops[0].name).to.be.equal('Singing in the shower');
      expect(workshops[1].name).to.be.equal('Singing in the shower');
    });

    it('should properly update multiple documents with "updateMany" method - concert info change', async () => {
      const concert = await Concert.findOne({ performer: 'John Doe' });
      await Workshop.updateMany({}, { $set: { concertId: concert._id } });
      const workshops = await Workshop.find().populate('concertId');
      expect(workshops[0].concertId.performer).to.be.equal('John Doe');
      expect(workshops[1].concertId.performer).to.be.equal('John Doe');
    });

    afterEach(async () => {
      await Concert.deleteMany();
      await Workshop.deleteMany();
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
        _id: '5d9f1140f10a81216cfd4408',
      });
      await testConcertOne.save();

      const testConcertTwo = new Concert({
        performer: 'Jane Doe',
        genre: 'jazz',
        price: 22,
        day: 2,
        image: 'abc',
        _id: '5d9f1159f81ce8d1ef2bee38',
      });
      await testConcertTwo.save();

      const testWorkshopOne = new Workshop({
        name: 'name1',
        concertId: '5d9f1140f10a81216cfd4408',
      });
      await testWorkshopOne.save();
      const testWorkshopTwo = new Workshop({
        name: 'name2',
        concertId: '5d9f1159f81ce8d1ef2bee38',
      });
      await testWorkshopTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Workshop.deleteOne({ name: 'name1' });
      const removeWorkshop = await Workshop.findOne({
        name: 'name1',
      });
      expect(removeWorkshop).to.be.null;
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      const concert = await Concert.findOne({ performer: 'John Doe' });
      await Workshop.deleteOne({ concertId: concert._id });
      const removedWorkshop = await Workshop.findOne({
        concertId: concert._id,
      });
      expect(removedWorkshop).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const workshop = await Workshop.findOne({ name: 'name2' });
      await workshop.remove();
      const removedWorkshop = await Workshop.findOne({
        name: 'name2',
      });
      expect(removedWorkshop).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Workshop.deleteMany();
      const workshops = await Workshop.find();
      expect(workshops.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Concert.deleteMany();
      await Workshop.deleteMany();
    });
  });
});
