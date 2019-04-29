const Joi = require('joi');
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100
	},
	startDate: {
		type: Date
	},
	endDate: {
		type: Date
	},
	description: {
		type: String
	},
	location: String,
	code: {
		type: String,
		unique: true
	},
	interest: {
		user: {
			type : mongoose.Schema.ObjectId, 
			ref: 'Users'
		},
		eventInterest: {
			type: Number
		}
	}
});

const Event = mongoose.model('Event', eventSchema);

function validateEvent(event) {
  const schema = {
		eventName: Joi.string().min(3).required(),
		
		startDate: Joi.date().required(),
		endDate: Joi.date().required(),
		description: Joi.string().min(1),
		location: Joi.string().min(1),
		code: Joi.string().min(1)
		
  };

  return Joi.validate(event, schema);
}

exports.eventSchema = eventSchema;
exports.Event = Event; 
exports.validate = validateEvent;