import models from '../models'
const Role = models.Role

export const findByCode = async (code, { tx }) => {
  return await Role.findOne({
    where: {
      code,
    },
  }, {
    transaction: tx,
  })
}