import Joi from 'joi'

export const validateCreateUserSchema = (body) => {
  const userSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })

  const { error } = userSchema.validate(body, { abortEarly: false })

  return error
}

export const validateUpdateUserSchema = (body) => {
  const userSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim(),
  })

  const { error } = userSchema.validate(body, { abortEarly: false })

  return error
}