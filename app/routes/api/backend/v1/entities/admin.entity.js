import _ from 'lodash'
import * as AdminService from '../../../../../services/admin.service'

export const adminDetail = async (admin) => {
  const {
    id,
    firstName,
    lastName,
    email,
    createdAt,
    updatedAt,
    roles,
  } = admin

  const abilities = await AdminService.getAbilities(admin)

  // custom roles
  const custom_roles = _.map(roles, (role) => (
    {
      name: role.name,
      code: role.code,
    }
  ))

  return {
    id,
    firstName,
    lastName,
    email,
    createdAt,
    updatedAt,
    abilities,
    roles: custom_roles,
  }
}
