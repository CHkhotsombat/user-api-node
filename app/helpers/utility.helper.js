import _ from 'lodash'

export const cleanNullKeys = (obj) => (
  _.omitBy(obj, _.isNil)
)