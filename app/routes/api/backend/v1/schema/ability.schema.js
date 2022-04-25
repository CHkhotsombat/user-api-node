import Joi from 'joi'

export const createAbilitySchema = (body) => {
  const abilitySchema = Joi.object({
    name: Joi.string().trim().required(),
    code: Joi.string().trim().required(),
  })

  const { error } = abilitySchema.validate(body, { abortEarly: false })

  return error
}