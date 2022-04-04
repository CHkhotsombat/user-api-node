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

const errorNotFound = (opts = {}) => {
  const htmlInfo = htmlStatus(404)
  const { message = htmlInfo.message } = opts

  return {
    status: htmlInfo.status,
    message: message
  }
}

const errorMethodNotAllowed = (opts = {}) => {
  const htmlInfo = htmlStatus(405)
  const { message = htmlInfo.message } = opts

  return {
    status: htmlInfo.status,
    message: message
  }
}

const errorValidateFailed = (opts = {}) => {
  const status = 422
  const { errors, message = htmlStatus(status).message } = opts
  
  if (Array.isArray(errors)) {
    return {
      status: status, 
      message: message, 
      errors: _.map(errors, ((obj) => (   
        obj.message?.toString().replaceAll('"', "")
      )))
    }
  }

  return {
    status,
    message
  }
}

const internalServerError = (opts = {}) => {
  const status = 500
  const { errors, message = htmlStatus(status).message } = opts

  return {
    status, 
    message,
    errors
  }
}

module.exports = {
  pagination,
  paging,
  responseWithPaging,
  errorNotFound,
  errorMethodNotAllowed,
  errorValidateFailed,
  internalServerError
}