import Joi from 'joi';

const id = Joi.number().min(1).strict();
const title = Joi.string();
const description = Joi.string();
const isComplete = Joi.bool();

const createTodoSchema = Joi.object().keys({
  title: title.required(),
  description: description.required(),
  isComplete: isComplete,
});

const todoDataSchema = Joi.object().keys({
  id: id,
  title: title,
  description: description,
  isComplete: isComplete,
});

export { createTodoSchema, todoDataSchema };
