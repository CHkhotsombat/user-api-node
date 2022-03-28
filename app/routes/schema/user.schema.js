const Joi = require('joi')

const validateUserSchema = (body) => {
  const userSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })

  const { error, value } = userSchema.validate(body, { abortEarly: false })

  return error
}

module.exports = {
  validateUserSchema
}