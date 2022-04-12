import models from '../models'
const Admin = models.Admin

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
export const createAdmin = async (params) => {
  return await Admin.create(params)  
}