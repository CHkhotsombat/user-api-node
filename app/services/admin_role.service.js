import models from '../models'
const AdminRole = models.AdminRole

export const createAdminRole = async (params, { tx }) => {
  return await AdminRole.bulkCreate(params, {transaction: tx})
}