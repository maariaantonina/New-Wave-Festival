const Concert = require('../models/concert.model');
const Seats = require('../models/seat.model');
const Workshop = require('../models/workshop.model');

exports.getAll = async (req, res) => {
  try {
    let concerts = await Concert.find().lean();
    let seats = await Seats.find().lean();
    let workshops = await Workshop.find().lean();
    res.json(
      concerts.map((concert) => ({
        ...concert,
        ticket: 50 - seats.filter((seat) => seat.day == concert.day).length,
        workshops: workshops.filter(
          (workshop) => workshop.concertId == concert._id
        ),
      }))
    );
  } catch {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPerformer = async (req, res) => {
  try {
    const concerts = await Concert.find({ performer: req.params.performer });
    if (!concerts.length) res.status(404).json({ message: 'Not found' });
    else res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByGenre = async (req, res) => {
  try {
    const concerts = await Concert.find({ genre: req.params.genre });
    if (!concerts.length) res.status(404).json({ message: 'Not found' });
    else res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPrice = async (req, res) => {
  try {
    const concerts = await Concert.find({
      price: { $gte: req.params.price_min, $lte: req.params.price_max },
    });
    if (!concerts.length) res.status(404).json({ message: 'Not found' });
    else res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByDay = async (req, res) => {
  try {
    const concerts = await Concert.find({ day: req.params.day });
    if (!concerts.length) res.status(404).json({ message: 'Not found' });
    else res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addNew = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image,
    });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.change = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    await Concert.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          performer: performer,
          genre: genre,
          price: price,
          day: day,
          image: image,
        },
      },
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
    await Concert.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) res.status(404).json({ message: 'Not found...' });
      else res.json(doc);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
