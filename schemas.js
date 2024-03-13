const Joi = require('joi');

module.exports.lifts = Joi.object({
    userId: Joi.string().required(),
    date: Joi.date().required(),
    bench: Joi.object({
        weightLifted: Joi.number().min(0).precision(2)
    }),
    squat: Joi.object({
        weightLifted: Joi.number().min(0).precision(2)
    }),
    deadlift: Joi.object({
        weightLifted: Joi.number().min(0).precision(2)
    })
}).or('bench', 'squat', 'deadlift'); 
