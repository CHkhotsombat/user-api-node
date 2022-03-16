const pagination = (page, page_size) => {
  let limit = page_size ? +(parseInt(page_size)) : 10
  let offset = page ? (parseInt(page) - 1) * limit : 0;
  offset = offset < 0 ? 0 : offset

  return { limit, offset }
}

const paging = (total_count, page, page_size) => {
  return {
    total_count,
    page,
    page_size,
    total_page: Math.ceil(total_count / page_size)
  }
}

const responseWithPaging = (data) => {
  const { count, rows } = data.results
  const { page, page_size } = data

  return { 
    code: 'success', 
    data: { 
      results: rows,
      paging: paging(count, page, page_size)
    }
  }
}

module.exports = {
  pagination,
  paging,
  responseWithPaging
}