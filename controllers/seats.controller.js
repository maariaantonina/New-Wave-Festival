const Seat = require('../models/seat.model');
const Client = require('../models/client.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addNew = async (req, res) => {
  try {
    let clientId = '';
    const cleanData = sanitize(req.body);
    const { day, seat, client, email } = cleanData;
    const existingClient = await Client.findOne({ name: client, email: email });

    if (!existingClient) {
      const newUser = await new Client({ name: client, email: email });
      const user = await newUser.save();
      clientId = user._id;
    } else clientId = existingClient._id;

    const newSeat = new Seat({ day: day, seat: seat, client: clientId });
    await newSeat.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.change = async (req, res) => {
  const { day, seat, client } = req.body;
  try {
    await Seat.findByIdAndUpdate(
      req.params.id,
      { $set: { day: day, seat: seat, client: client } },
      { new: true },
      (err, doc) => {
        if (err) res.status(404).json({ message: 'Not found...' });
        else res.json(doc);
      }
    );
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    await Seat.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) res.status(404).json({ message: 'Not found...' });
      else res.json(doc);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
