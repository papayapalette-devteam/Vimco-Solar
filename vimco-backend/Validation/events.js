const Joi = require("joi");

const eventValidationSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),

  author: Joi.string()
    .min(2)
    .max(100)
    .allow(null, "")
    .optional(),

  description: Joi.string().min(5).required(),

  image_url: Joi.string()
    .uri()
    .allow(null, "")
    .optional(),

  event_date: Joi.date().required(),

  is_active: Joi.boolean().optional(),

  display_order: Joi.number().integer().min(0).optional(),
});

module.exports = { eventValidationSchema };
