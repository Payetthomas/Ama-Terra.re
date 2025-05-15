import Joi from "joi";

export const promotionSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().allow(""),
  type: Joi.string().valid("percentage", "fixed").required(),
  value: Joi.number().positive().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().greater(Joi.ref("start_date")).required(),
  product_id: Joi.number().integer().required()
});
