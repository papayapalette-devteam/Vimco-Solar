const Joi = require("joi");

exports.testimonialValidationSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),

  role: Joi.string().min(2).max(150).required(),

  content: Joi.string().min(5).required(),

  rating: Joi.number().integer().min(1).max(5).required(),

  image_url: Joi.string().uri().allow("", null),

  is_active: Joi.boolean(),

  display_order: Joi.number().integer().min(0),
});
