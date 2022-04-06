import Joi from 'joi'

export const validateCreateUser = (body) => {
  const userSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })

  const { error } = userSchema.validate(body, { abortEarly: false })

  return error
}
