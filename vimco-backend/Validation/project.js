const Joi = require("joi");

const projectValidationSchema  = Joi.object({
  title: Joi.string().trim().min(2).max(200).optional(),

  location: Joi.string().trim().optional(),

  capacity: Joi.string().optional(),

  completed_date: Joi.date().optional(),

  description: Joi.string().min(5).optional(),

  client_name: Joi.string().trim().optional(),

  project_type: Joi.string()
    .valid("residential", "commercial", "industrial")
    .optional(),

  images: Joi.array().items(Joi.string().uri()).optional(),
});

module.exports = { projectValidationSchema  };
