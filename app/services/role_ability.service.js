import { cleanNullKeys } from '../helpers/utility.helper'
import models from '../models'
const { RoleAbility } = models

export const createBulk = async (body, opts = {}) => {
  const { tx } = opts
  const result = await RoleAbility.bulkCreate(
    body,
    {
      fields: ['role_id', 'ability_id'],
      updateOnDuplicate: ['role_id', 'ability_id'],
      transaction: tx,
    }
  )

  result
}

export const destroy = async (opts = {}) => {
  const { tx, role_id, ability_id } = opts

  const result = await RoleAbility.destroy(
    {
      where: cleanNullKeys({
        role_id,
        ability_id,
      }),
    },
    {
      transaction: tx,
    }
  )

  result
}