import _ from 'lodash'
import { htmlStatus } from './constants'

export const pagination = (page, pageSize) => {
  let limit = pageSize ? +parseInt(pageSize) : 10
  let offset = page ? (parseInt(page) - 1) * limit : 0
  offset = offset < 0 ? 0 : offset

  return { limit, offset }
}

export const paging = (totalCount, page, pageSize) => {
  return {
    totalCount,
    page,
    pageSize,
    totalPage: Math.ceil(totalCount / pageSize),
  }
}

export const responseSuccess = ({ res, status = 200, data = null }) => {
  const htmlInfo = htmlStatus(status)

  res.status(status).json({
    code: htmlInfo.code,
    data: data,
  })
}

export const responseWithPaging = (res, data) => {
  const { page, pageSize, results } = data
  const { count, rows } = results
  const htmlInfo = htmlStatus(200)

  res.status(htmlInfo.status).json({
    code: htmlInfo.code,
    data: {
      results: rows,
      paging: paging(count, page, pageSize),
    },
  })
}

export const errorNotFound = (opts = {}) => {
  const htmlInfo = htmlStatus(404)
  const { message = htmlInfo.message } = opts

  return {
    status: htmlInfo.status,
    message: message,
  }
}

export const errorMethodNotAllowed = (opts = {}) => {
  const htmlInfo = htmlStatus(405)
  const { message = htmlInfo.message } = opts

  return {
    status: htmlInfo.status,
    message: message,
  }
}

export const errorUnauthorize = (opts = {}) => {
  const htmlInfo = htmlStatus(401)
  const { message = htmlInfo.message } = opts

  return {
    status: htmlInfo.status,
    message: message,
  }
}

export const errorValidateFailed = (opts = {}) => {
  const status = 422
  const { errors, message = htmlStatus(status).message } = opts

  if (Array.isArray(errors)) {
    return {
      status: status,
      message: message,
      errors: _.map(errors, (obj) =>
        obj.message?.toString().replaceAll('"', '')
      ),
    }
  }

  return {
    status,
    message,
  }
}

export const internalServerError = (opts = {}) => {
  const status = 500
  const { errors, message = htmlStatus(status).message } = opts

  return {
    status,
    message,
    errors,
  }
}
