import Joi from "joi";

export const promotionSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  type: Joi.string().valid("percentage", "fixed").required(),
  value: Joi.number().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  product_ids: Joi.array().items(Joi.number().integer()).min(1).required()
});