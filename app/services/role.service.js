import models from '../models'
import boom from '@hapi/boom'
import _ from 'lodash'
import * as RoleAbilityService from './role_ability.service'
const { Role, Ability } = models

export const findByCode = async (code, { tx }) => {
  return await Role.findOne({
    where: {
      code,
    },
  }, {
    transaction: tx,
  })
}

export const getRoleList = async (params = {}) => {
  let { offset, limit } = params

  const roles = await Role.findAndCountAll({
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

  return roles
}

export const getRoleOptions = async() => {
  const roles = await Role.findAll({
    order: ['id'],
    attributes: [
      ['id', 'value'],
      ['name', 'label'],
    ],
  })

  return roles
}

export const createRole = async (body, opts = {}) => {
  const { tx } = opts
  const { name, code, ability_ids } = body

  const role = await Role.create({
    name,
    code,
  }, {
    transaction: tx,
  })

  if (ability_ids) {
    // destroy
    await RoleAbilityService.destroy({ role_id: role.id, tx })

    // create
    const roleAbilities = _.map(ability_ids, (id) => {
      return {
        role_id: role.id,
        ability_id: id,
      }
    })

    await RoleAbilityService.createBulk(roleAbilities, { tx })
  }


  return role
}

export const findById = async (id, opts = {}) => {
  const { tx, exceptNotFound = false } = opts

  const role = await Role.findByPk(id, {
    transaction: tx,
    include: [
      {
        model: Ability,
        as: 'abilities',
        attributes: [
          'id',
          'name',
        ],
        through: {
          attributes: [],
        },
      },
    ],
  })

  if (!exceptNotFound && !role) throw boom.notFound('Role not found.')

  return role
}

export const updateRole = async (role, body, opts = {}) => {
  const { tx } = opts
  const { name, code, ability_ids } = body

  if (ability_ids) {
    // destroy
    await RoleAbilityService.destroy({ role_id: role.id, tx })

    // create
    const roleAbilities = _.map(ability_ids, (id) => {
      return {
        role_id: role.id,
        ability_id: id,
      }
    })

    await RoleAbilityService.createBulk(roleAbilities, { tx })
  }

  role = await role.update({
    name,
    code,
  }, {
    transaction: tx,
    include: [
      {
        model: Ability,
        as: 'abilities',
        attributes: [
          'id',
          'name',
        ],
        through: {
          attributes: [],
        },
      },
    ],
  })

  return role
}