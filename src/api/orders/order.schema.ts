import joi from 'joi';
import { Size } from '../apparels/apparel.interface';

export const orderSchema = joi.object({
    id: joi.string(),
    customer: joi.string().required(),
    items: joi.array().items({
        size: joi.string().required().valid(...Object.values(Size)),
        quantity: joi.number().required(),
        apparel: joi.string().required(),
    }).required(),
    status: joi.string(),
    totalSellingPrice: joi.number(),
    totalMinPrice: joi.number(),
    createdAt: joi.date(),
    updatedAt: joi.date()
})
