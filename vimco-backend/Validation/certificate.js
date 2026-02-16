const Joi = require("joi");

const certificateValidationSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),

  description: Joi.string().min(5).required(),

  image_url: Joi.string().uri().allow(null, "").optional(),

  is_featured: Joi.boolean().optional(),

  is_active: Joi.boolean().optional(),

  display_order: Joi.number().integer().min(0).optional(),
});

module.exports = {
  certificateValidationSchema,
};
