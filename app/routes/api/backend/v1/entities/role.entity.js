export const roleDetail = (role) => {
  const {
    id,
    name,
    code,
    createdAt,
    updatedAt,
    abilities,
  } = role

  return {
    id,
    name,
    code,
    createdAt,
    updatedAt,
    abilities,
  }
}
