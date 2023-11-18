import joi from 'joi';
import { Size } from './apparel.interface';

export const apparelSchema = joi.object({
    name: joi.string().required(),
    code: joi.string(),
    sizes: joi.array().items({
        size: joi.string().required().valid(...Object.values(Size)),
        quantity: joi.number().required(),
        minPrice: joi.number().required(),
        sellingPrice: joi.number().required(),
    }).required(),
    vendor: joi.string().required(),
    createdAt: joi.date(),
    updatedAt: joi.date()
})

export const multipleApparelUpdate = joi.array().items({
    code: joi.string().required(),
    size: joi.string().required().valid(...Object.values(Size)),
    updateData: joi.object({
        quantity: joi.number(),
        minPrice: joi.number(),
        sellingPrice: joi.number(),
    })
})
