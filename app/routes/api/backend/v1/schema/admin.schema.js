import Joi from 'joi'

export const createAdminSchema = (body) => {
  const userSchema = Joi.object({
    firstName: Joi.string().trim(),
    lastName: Joi.string().trim(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })

  const { error } = userSchema.validate(body, { abortEarly: false })

  return error
}