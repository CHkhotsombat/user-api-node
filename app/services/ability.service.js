import boom from '@hapi/boom'
import models from '../models'
const Ability = models.Ability

export const createAbility = async (body, { tx }) => {
  return await Ability.create(body, { transaction: tx })
}

export const getAbilityList = async (params = {}) => {
  let { offset, limit } = params

  const abilities = await Ability.findAndCountAll({
    limit,
    offset,
    where: {},
    attributes: [
      'id',
      'name',
      'code',
      'createdAt',
      'updatedAt',
    ],
  })

  return abilities
}

export const findById = async (id, opts = {}) => {
  const { tx, exceptNotFound = false } = opts
  const ability = await Ability.findByPk(id, {
    transaction: tx,
  })

  if (!exceptNotFound && !ability) throw boom.notFound('Ability not found.')

  return ability
}

export const findOne = async (query, opts = {}) => {
  const { tx } = opts
  const ability = await Ability.findOne({
    where: {
      ...query,
    },
  }, {
    transaction: tx,
  }
  )

  return ability
}

export const updateAbility = async (ability, body, { tx }) => {
  console.log('ability--', ability)

  await ability.update({
    ...body,
  }, {
    transaction: tx,
  })

  ability
}

export const deleteAbility = async (id) => {
  const ability = await Ability.destroy({
    where: {
      id: id,
    },
  })

  return ability
}