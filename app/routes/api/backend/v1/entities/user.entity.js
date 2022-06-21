import { userAvatarUrl } from '../../../../../utils/helpers'

export const userDetail = (user) => {
  const {
    id,
    firstName,
    lastName,
    email,
    status,
    emailConfirmedAt,
    avatarName,
    createdAt,
    updatedAt,
  } = user

  const avatarUrl = avatarName ? userAvatarUrl(avatarName) : null

  return {
    id,
    firstName,
    lastName,
    email,
    status,
    emailConfirmedAt,
    avatarUrl,
    createdAt,
    updatedAt,
  }
}
