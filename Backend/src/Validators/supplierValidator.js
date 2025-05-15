import Joi from "joi"; 

export const supplierSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    contact_email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).message("Le téléphone doit contenir 10 chiffres"),
    adresse: Joi.string().optional()
})