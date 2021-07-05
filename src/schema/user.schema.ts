import Joi from 'joi';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const id = Joi.number().min(1);
const email = Joi.string().pattern(emailRegex);
const password = Joi.string().min(6).max(15);


const createUserSchema = Joi.object().keys({
  email: email.required(),
  password: password.required(),
});

export { createUserSchema };
