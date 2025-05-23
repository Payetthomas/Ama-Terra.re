import Joi from "joi";
import passwordValidator from "password-validator";

export const authSchema = Joi.object({
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    profil_img: Joi.string().uri().optional()
  });

export const passwordSchema = new passwordValidator();

  passwordSchema
    .is()
    .min(8) // Minimum 8 caractères
    .is()
    .max(50) // Maximum 50 caractères
    .has()
    .uppercase() // Doit avoir des majuscules
    .has()
    .lowercase() // Doit avoir des minuscules
    .has()
    .digits(1) // Doit avoir au moins 1 chiffre
    .has()
    .symbols(1) // Doit avoir au moins 1 caractère spécial
    .has()
    .not()
    .spaces(); // Ne doit pas contenir d'espaces
