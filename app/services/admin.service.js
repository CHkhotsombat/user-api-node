import boom from '@hapi/boom'
import _ from 'lodash'
import models from '../models'
const { Admin, Role, Ability } = models

export const getAdminList = async (params = {}) => {
  let { offset, limit } = params

  const admins = await Admin.findAndCountAll({
    limit,
    offset,
    where: {},
    attributes: [
      'id',
      'firstName',
      'lastName',
      'email',
      'createdAt',
      'updatedAt',
    ],
  })

  return admins
}
export const createAdmin = async (body, { tx }) => {
  return await Admin.create(body, {
    transaction: tx,
  })
}

export const findById = async (id, opts = {}) => {
  const { tx, exceptNotFound = false } = opts
  const admin = await Admin.findByPk(id, {
    transaction: tx,
    include: [
      {
        model: Role,
        as: 'roles',
        attributes: [
          'id',
          'name',
          'code',
        ],
      },
    ],
  })

  if (!exceptNotFound && !admin) throw boom.notFound('Admin not found.')

  return admin
}

export const findByEmail = async (email, opts = {}) => {
  const { tx, exceptNotFound = false } = opts

  const admin = await Admin.findOne(
    {
      where: {
        email: email,
      },
    },
    {
      transaction: tx,
    }
  )

  if (!exceptNotFound && !admin) throw boom.notFound('Admin not found.')

  return admin
}

export const getAbilities = async (admin, opts = {}) => {
  const { tx } = opts

  const roleIds = _.map(admin.roles, (role) => ( role.id ))

  const abilities = await Ability.findAll(
    {
      where: {},
      attributes: [
        'name',
        'code',
      ],
      include: [
        {
          model: Role,
          as: 'roles',
          where: {
            id: roleIds,
          },
          attributes: [],
        },
      ],
    },
    {
      transaction: tx,
    }
  )

  return abilities
}

export const updateAdmin = async (admin, body, opts = {}) => {
  const { tx } = opts

  await admin.update({
    ...body,
  }, {
    transaction: tx,
  })

  return admin
}