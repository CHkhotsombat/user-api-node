export const userDetail = (user) => {
  const {
    id,
    firstName,
    lastName,
    email,
    status,
    emailConfirmedAt,
    createdAt,
    updatedAt,
  } = user

  return {
    id,
    firstName,
    lastName,
    email,
    status,
    emailConfirmedAt,
    createdAt,
    updatedAt,
  }
}
