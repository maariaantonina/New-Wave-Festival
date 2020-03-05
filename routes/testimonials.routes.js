const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.filter(item => item.id == req.params.id));
});

router.route('/testimonials').post((req, res) => {
  const newOpinion = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text
  };
  db.testimonials.push(newOpinion);
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
  const opinion = db.testimonials.find(item => item.id == req.params.id);
  const index = db.testimonials.indexOf(opinion);
  const updatedOpinion = {
    ...opinion,
    author: req.body.author,
    text: req.body.text
  };
  db.testimonials[index] = updatedOpinion;
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  const opinion = db.testimonials.find(item => item.id == req.params.id);
  const index = db.testimonials.indexOf(opinion);
  db.testimonials.splice(index, 1);
  res.json({ message: 'OK' });
});

module.exports = router;
