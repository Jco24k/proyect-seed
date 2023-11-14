import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    type: Joi.valid('mysql', 'postgres', 'mssql', 'oracle').required().default("postgres"),
    host: Joi.required(),
    username: Joi.required(),
    password: Joi.required(),
    database: Joi.required(),
    port: Joi.required(),
    ssl: Joi.required(),
})

