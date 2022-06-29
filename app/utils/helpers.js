import _ from 'lodash'

export const userAvatarPath = (avatarName) => (
  `/uploads/users/avatars/${avatarName}`
)

export const userAvatarUrl = (avatarName) => (
  process.env.HOST + userAvatarPath(avatarName)
)

export const privatePath = () => (
  `${__basedir}/private`
)

export const cleanNullKeys = (obj) => (
  _.omitBy(obj, _.isNil)
)