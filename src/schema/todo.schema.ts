import Joi from 'joi';

const id = Joi.string().alphanum().min(1);
const title = Joi.string();
const description = Joi.string();
const isComplete = Joi.bool();

const createTodoSchema = Joi.object().keys({
  title: title.required(),
  description: description.required(),
  isComplete: isComplete
});

const todoDataSchema = Joi.object().keys({
  id: id.required(),
  title: title.required(),
  description: description.required(),
  isComplete: isComplete
});

export { createTodoSchema, todoDataSchema };
