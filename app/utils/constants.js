const htmlStatus = (status = '') => {
  const allStatus = {
    '200': {
      status: 200,
      code: 'success',
      message: 'Success'
    },
    '201': {
      status: 201,
      code: 'success',
      message: 'Create Success.'
    },
    '204': {
      status: 204,
      code: 'success',
      message: 'Success, No content.'
    },
    '400': {
      status: 400,
      code: 'badRequest',
      message: 'Bad Request.'
    },
    '401': {
      status: 401,
      code: 'unauthorized',
      message: 'Unauthorized.'
    },
    '403': {
      status: 403,
      code: 'forbidden',
      message: 'Access Denied.'    
    },
    '404': {
      status: 404,
      code: 'notFound',
      message: 'Not found.'
    },
    '405': {
      status: 405,
      code: 'methodNotAllowed',
      message: 'HTTP Method Not Allowed.'
    },  
    '422': {
      status: 422,
      code: 'validateFailed',
      message: 'Validate Failed.'
    },
    '500': {
      status: 500,
      code: 'serverError',
      message: 'Internal Server Error.'
    }
  }

  if (!status) return allStatus

  return allStatus[`${status}`] || {}
}

module.exports = {
  htmlStatus
}
