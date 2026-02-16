const Joi = require("joi");

const logoValidationSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),

  logo_url: Joi.string()
    .uri()
    .allow(null, "")
    .optional(),

  text_logo: Joi.string()
    .min(1)
    .max(200)
    .allow(null, "")
    .optional(),

  is_active: Joi.boolean().optional(),

  display_order: Joi.number().integer().min(0).optional(),
});

module.exports = { logoValidationSchema };
