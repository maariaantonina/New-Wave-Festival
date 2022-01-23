/* const Workshop = require('../workshop.model');
const Concert = require('../concert.model');

const expect = require('chai').expect;
const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

describe('Workshop', () => {
  before(async () => {
    try {
      const mongoServer = await MongoMemoryServer.create();

      mongoose.connect(mongoServer.getUri(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.log(err);
    }
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
      console.log(workshops);
      const expectedLength = 2;
      expect(workshops.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "name" with "findOne" method', async () => {
      const workshop = await Workshop.findOne({ name: 'name1' });
      expect(workshop.name).to.be.equal('name1');
    });

    it('should return a proper document by "concert performer" with "find" method', async () => {
      const concert = await Concert.findOne();
      const workshop = await Workshop.findOne()
        .populate({
          path: 'concertId',
          match: { performer: concert.performer },
        })
        .exec();
      expect(workshop.concertId.performer).to.be.equal(concert.performer);
    });

    afterEach(async () => {
      await Workshop.deleteMany();
      await Concert.deleteMany();
    });
  });

  /* describe('Creating data', () => {
    before(async () => {
      const testConcert = new Concert({ name: 'name1' });
      await testConcert.save();
    });

    it('should insert new document with "insertOne" method', async () => {
      const concert = await Concert.findOne({ name: 'name1' });
      const workshop = new Workshop({
        firstName: 'name1',
        lastName: 'name1',
        concert: concert._id,
      });
      await workshop.save();
      const savedWorkshop = await Workshop.findOne({
        firstName: 'name1',
      }).populate('concert');
      expect(savedWorkshop).to.not.be.null;
      expect(savedWorkshop.concert.name).to.be.equal('name1');
    });

    afterEach(async () => {
      await Workshop.deleteMany();
      await Concert.deleteMany();
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testConcertOne = new Concert({ name: 'Concert #1' });
      await testConcertOne.save();
      const testConcertId = testConcertOne._id;

      const testConcertTwo = new Concert({ name: 'Concert #2' });
      await testConcertTwo.save();
      const testConcertId2 = testConcertTwo._id;

      const testWorkshopOne = new Workshop({
        firstName: 'name1',
        lastName: 'name1',
        concert: testConcertId,
      });
      await testWorkshopOne.save();
      const testWorkshopTwo = new Workshop({
        firstName: 'name2',
        lastName: 'name2',
        concert: testConcertId2,
      });
      await testWorkshopTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Workshop.updateOne(
        { firstName: 'name1' },
        { $set: { firstName: '=name1=' } }
      );
      const updatedWorkshop = await Workshop.findOne({
        firstName: '=name1=',
      });
      expect(updatedWorkshop).to.not.be.null;
    });

    it('should properly update one document with "updateOne" method - concert info change', async () => {
      const concert = await Concert.findOne({ name: 'Concert #2' });
      await Workshop.updateOne(
        { firstName: 'name1' },
        { $set: { concert: concert._id } }
      );
      const updatedWorkshop = await Workshop.findOne({
        concert: concert._id,
      }).populate('concert');
      expect(updatedWorkshop).to.not.be.null;
      expect(updatedWorkshop.concert.name).to.be.equal('Concert #2');
    });

    it('should properly update one document with "save" method', async () => {
      const workshop = await Workshop.findOne({ firstName: 'name2' });
      workshop.firstName = '=name2=';
      await workshop.save();

      const updatedWorkshop = await Workshop.findOne({
        firstName: '=name2=',
      });
      expect(updatedWorkshop).to.not.be.null;
    });

    it('should properly update one document with "save" method - concert info change', async () => {
      const concert = await Concert.findOne({ name: 'Concert #1' });
      const concert2 = await Concert.findOne({ name: 'Concert #2' });
      const workshop = await Workshop.findOne({ concert: concert._id });
      workshop.concert = concert2._id;
      await workshop.save();

      const updatedWorkshop = await Workshop.findOne({
        concert: concert2._id,
      });
      expect(updatedWorkshop).to.not.be.null;
      expect(workshop.concert).to.be.equal(concert2._id);
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Workshop.updateMany({}, { $set: { firstName: 'Updated!' } });
      const workshops = await Workshop.find();
      expect(workshops[0].firstName).to.be.equal('Updated!');
      expect(workshops[1].firstName).to.be.equal('Updated!');
    });

    it('should properly update multiple documents with "updateMany" method - concert info change', async () => {
      const concert = await Concert.findOne({ name: 'Concert #1' });
      await Workshop.updateMany({}, { $set: { concert: concert._id } });
      const workshops = await Workshop.find().populate('concert');
      expect(workshops[0].concert.name).to.be.equal('Concert #1');
      expect(workshops[1].concert.name).to.be.equal('Concert #1');
    });

    afterEach(async () => {
      await Concert.deleteMany();
      await Workshop.deleteMany();
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testConcertOne = new Concert({ name: 'Concert #1' });
      await testConcertOne.save();
      const testConcertId = testConcertOne._id;

      const testConcertTwo = new Concert({ name: 'Concert #2' });
      await testConcertTwo.save();
      const testConcertId2 = testConcertTwo._id;

      const testWorkshopOne = new Workshop({
        firstName: 'name1',
        lastName: 'name1',
        concert: testConcertId,
      });
      await testWorkshopOne.save();
      const testWorkshopTwo = new Workshop({
        firstName: 'name2',
        lastName: 'name2',
        concert: testConcertId2,
      });
      await testWorkshopTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Workshop.deleteOne({ firstName: 'name1' });
      const removeWorkshop = await Workshop.findOne({
        firstName: 'name1',
      });
      expect(removeWorkshop).to.be.null;
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      const concert = await Concert.findOne({ name: 'Concert #1' });
      await Workshop.deleteOne({ concert: concert._id });
      const removedWorkshop = await Workshop.findOne({
        concert: concert._id,
      });
      expect(removedWorkshop).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const workshop = await Workshop.findOne({ firstName: 'name2' });
      await workshop.remove();
      const removedWorkshop = await Workshop.findOne({
        firstName: 'name2',
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

  after(() => {
    mongoose.models = {};
  });
});
 */
