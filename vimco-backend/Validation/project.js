const Joi = require("joi");

const projectValidationSchema  = Joi.object({
  title: Joi.string().trim().min(2).max(200).required(),

  location: Joi.string().trim().required(),

  capacity: Joi.string().required(),

  completed_date: Joi.date().required(),

  description: Joi.string().min(5).required(),

  client_name: Joi.string().trim().required(),

  project_type: Joi.string()
    .valid("residential", "commercial", "industrial")
    .required(),

  images: Joi.array().items(Joi.string().uri()).optional(),
});

module.exports = { projectValidationSchema  };
