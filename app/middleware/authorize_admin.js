import _ from 'lodash'
import { errorForbidden } from '../utils/apiHelpers'
import * as AdminService from '../services/admin.service'


export const authorizeAdmin = (...allowedAbilities) => {
  return async (req, res, next) => {
    const abilities = await AdminService.getAbilities(req.current_admin)
    const ability_codes = _.map(abilities, (ability) => ( ability.code ))

    if (_.isEmpty(ability_codes)) {
      return next(errorForbidden())
    }

    const intersections = _.intersection(ability_codes, allowedAbilities)

    if (_.isEmpty(intersections)) {
      return next(errorForbidden())
    }

    next()
  }
}