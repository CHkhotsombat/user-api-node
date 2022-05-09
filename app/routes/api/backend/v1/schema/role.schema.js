import Joi from 'joi'

export const validateCreateRoleSchema = (body) => {
  const roleSchema = Joi.object({
    name: Joi.string().trim().required(),
    code: Joi.string().trim().required(),
    abilityIds: Joi.array().items(Joi.number().integer()).required(),
  })

  const { error } = roleSchema.validate(body, { abortEarly: false })

  return error
}