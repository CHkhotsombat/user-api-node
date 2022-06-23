export const userAvatarPath = (avatarName) => (
  `/uploads/users/avatars/${avatarName}`
)

export const userAvatarUrl = (avatarName) => (
  process.env.HOST + userAvatarPath(avatarName)
)

export const privatePath = () => (
  `${__basedir}/private`
)