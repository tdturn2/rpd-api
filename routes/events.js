//const auth = require('../middleware/auth');
//const admin = require('../middleware/admin');
const {Event, validate} = require('../models/event');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());


router.get('/', async (req, res) => {

  const events = await Event.find().sort('startDate');
  res.send(events);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

//	let event = new Event({ eventName: req.body.eventName });
	let event = new Event({ 
		eventName: req.body.eventName,
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		description: req.body.description,
		location: req.body.location,
		code: req.body.code
  });
	

	
  event = await event.save();
  
  res.send(event);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const event = await Event.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!event) return res.status(404).send('The event with the given ID was not found.');
  
  res.send(event);
});

/*
router.delete('/:id', [auth, admin], async (req, res) => {
  const event = await Event.findByIdAndRemove(req.params.id);

  if (!event) return res.status(404).send('The event with the given ID was not found.');

  res.send(event);
});
*/

router.get('/:id', async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) return res.status(404).send('The event with the given ID was not found.');

  res.send(event);
});

module.exports = router;