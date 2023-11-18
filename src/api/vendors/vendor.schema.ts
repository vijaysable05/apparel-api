import joi from 'joi';

export const vendorSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    id: joi.string(),
    apparels: joi.array(),
    createdAt: joi.date(),
    updatedAt: joi.date()
})