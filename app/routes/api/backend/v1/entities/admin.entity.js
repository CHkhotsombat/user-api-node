export const adminDetail = (admin) => {
  const {
    id,
    firstName,
    lastName,
    email,
    createdAt,
    updatedAt,
    roles,
  } = admin

  return {
    id,
    firstName,
    lastName,
    email,
    createdAt,
    updatedAt,
    roles,
  }
}
