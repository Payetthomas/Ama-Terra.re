import Joi from "joi";

export const eventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  location: Joi.string().allow(""),
  event_date: Joi.date().required(),
  duration: Joi.number().integer().min(0).optional(),
  price: Joi.number().min(0).default(0),
  url: Joi.string()
          .uri()
          .default("https://reservationbeaute.fr/ama-terra-97410/prestations-saint-pierre"),
  seats_avaible: Joi.number().min(0).default(0),
  intervenant: Joi.string().allow("").optional(),
});
