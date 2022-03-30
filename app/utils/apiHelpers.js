const pagination = (page, pageSize) => {
  let limit = pageSize ? +(parseInt(pageSize)) : 10
  let offset = page ? (parseInt(page) - 1) * limit : 0;
  offset = offset < 0 ? 0 : offset

  return { limit, offset }
}

const paging = (totalCount, page, pageSize) => {
  return {
    totalCount,
    page,
    pageSize,
    totalPage: Math.ceil(totalCount / pageSize)
  }
}

const responseWithPaging = (data) => {
  const { count, rows } = data.results
  const { page, pageSize } = data

  return { 
    code: 'success', 
    data: { 
      results: rows,
      paging: paging(count, page, pageSize)
    }
  }
}

const errorNotFound = (message = "Not found") => {
  return {
    status: 404,
    message: message
  }
}

module.exports = {
  pagination,
  paging,
  responseWithPaging,
  errorNotFound
}