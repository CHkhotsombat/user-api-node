const htmlStatus = () => {
  return {
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
      code: 'bad_request',
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
      code: 'not_found',
      message: 'Not found.'
    },
    '405': {
      status: 405,
      code: 'method_not_allowed',
      message: 'HTTP Method Not Allowed.'
    },  
    '422': {
      status: 422,
      code: 'validate_failed',
      message: 'Validate Failed.'
    },
    '500': {
      status: 500,
      code: 'server_error',
      message: 'Internal Server Error.'
    }
  }
}

module.exports = {
  htmlStatus
};
