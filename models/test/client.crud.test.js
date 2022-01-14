const Client = require('../client.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

describe('Client', () => {
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
    before(async () => {
      const testClientOne = new Client({
        name: 'Client #1',
        email: 'client1@client.com',
      });
      await testClientOne.save();

      const testClientTwo = new Client({
        name: 'Client #2',
        email: 'client2@client.com',
      });
      await testClientTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const clients = await Client.find();
      const expectedLength = 2;
      expect(clients.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "name" with "findOne" method', async () => {
      const client = await Client.findOne({ name: 'Client #1' });
      expect(client.name).to.be.equal('Client #1');
    });

    after(async () => {
      await Client.deleteMany();
    });
  });

  describe('Creating data', () => {
    it('should insert new document with "insertOne" method', async () => {
      const client = new Client({
        name: 'Client #1',
        email: 'client1@client.com',
      });
      await client.save();
      const savedClient = await Client.findOne({
        name: 'Client #1',
      });
      expect(savedClient).to.not.be.null;
    });

    after(async () => {
      await Client.deleteMany();
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testClientOne = new Client({
        name: 'Client #1',
        email: 'client1@client.com',
      });
      await testClientOne.save();

      const testClientTwo = new Client({
        name: 'Client #2',
        email: 'client2@client.com',
      });
      await testClientTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Client.updateOne(
        { name: 'Client #1' },
        { $set: { name: '=Client #1=' } }
      );
      const updatedClient = await Client.findOne({
        name: '=Client #1=',
      });
      expect(updatedClient).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const client = await Client.findOne({ name: 'Client #1' });
      client.name = '=Client #1=';
      await client.save();

      const updatedClient = await Client.findOne({
        name: '=Client #1=',
      });
      expect(updatedClient).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Client.updateMany({}, { $set: { name: 'Updated!' } });
      const clients = await Client.find();
      expect(clients[0].name).to.be.equal('Updated!');
      expect(clients[1].name).to.be.equal('Updated!');
    });

    afterEach(async () => {
      await Client.deleteMany();
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testClientOne = new Client({
        name: 'Client #1',
        email: 'client1@client.com',
      });
      await testClientOne.save();

      const testClientTwo = new Client({
        name: 'Client #2',
        email: 'client2@client.com',
      });
      await testClientTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Client.deleteOne({ name: 'Client #1' });
      const removedClient = await Client.findOne({
        name: 'Client #1',
      });
      expect(removedClient).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const client = await Client.findOne({ name: 'Client #1' });
      await client.remove();
      const removedClient = await Client.findOne({
        name: 'Client #1',
      });
      expect(removedClient).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Client.deleteMany();
      const clients = await Client.find();
      expect(clients.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Client.deleteMany();
    });
  });

  after(() => {
    mongoose.models = {};
  });
});
