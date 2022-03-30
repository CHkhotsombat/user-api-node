const _ = require('lodash')
const { htmlStatus } = require('./constants')

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

const errorValidateFailed = (opts = {}) => {
  const { errors, message = htmlStatus(422).message } = opts
  
  if (Array.isArray(errors)) {
    return {
      status: 422, 
      message: message, 
      errors: _.map(errors, ((obj) => (   
        obj.message?.toString().replaceAll('"', "")
      )))
    }
  }

  return {
    status: 422, 
    message: message,
  }
}

module.exports = {
  pagination,
  paging,
  responseWithPaging,
  errorNotFound,
  errorValidateFailed
}