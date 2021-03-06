import { cleanNullKeys } from '../utils/helpers'
import models from '../models'
const AdminRole = models.AdminRole

export const createBulk = async (body, opts = {}) => {
  const { tx } = opts
  const result = await AdminRole.bulkCreate(
    body,
    {
      fields: ['roleId', 'adminId'],
      updateOnDuplicate: ['roleId', 'adminId'],
      transaction: tx,
    }
  )

  result
}

export const getList = async (params, opts = {}) => {
  const { tx } = opts
  return await AdminRole.findAll(params, { transaction: tx })
}

export const destroy = async (opts = {}) => {
  const { tx, roleId, adminId } = opts

  const result = await AdminRole.destroy(
    {
      where: cleanNullKeys({
        roleId,
        adminId,
      }),
    },
    {
      transaction: tx,
    }
  )

  result
}