import Joi from "joi"; 

export const authSchema = Joi.object({
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    profil_img: Joi.string().uri().optional()
  });