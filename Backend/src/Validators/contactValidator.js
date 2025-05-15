import Joi from "joi";

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().min(3).required(),
  message: Joi.string().min(5).required()
});
