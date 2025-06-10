import Joi from "joi"; 

export const productSchema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().allow("", null),
    price: Joi.number().min(0).required(),
    image: Joi.string().uri().optional(),
    image_public_id: Joi.string().optional(),
    stock: Joi.number().integer().min(0).default(0),
    category_id: Joi.number().integer().required(),
    supplier_id: Joi.number().integer().required(),
});