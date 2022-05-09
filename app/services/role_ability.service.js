import { cleanNullKeys } from '../helpers/utility.helper'
import models from '../models'
const { RoleAbility } = models

export const createBulk = async (body, opts = {}) => {
  const { tx } = opts
  const result = await RoleAbility.bulkCreate(
    body,
    {
      fields: ['roleId', 'abilityId'],
      updateOnDuplicate: ['roleId', 'abilityId'],
      transaction: tx,
    }
  )

  result
}

export const destroy = async (opts = {}) => {
  const { tx, roleId, abilityId } = opts

  const result = await RoleAbility.destroy(
    {
      where: cleanNullKeys({
        roleId,
        abilityId,
      }),
    },
    {
      transaction: tx,
    }
  )

  result
}