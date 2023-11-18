import joi from 'joi';

export const customerSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    id: joi.string(),
    createdAt: joi.date(),
    updatedAt: joi.date()
})