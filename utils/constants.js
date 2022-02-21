const htmlStatuses = [
  {
    status: 200,
    code: 'success',
    message: 'Success'
  },
  {
    status: 201,
    code: 'success',
    message: 'Create Success.'
  },
  {
    status: 204,
    code: 'success',
    message: 'Success, No content.'
  },
  {
    status: 400,
    code: 'bad_request',
    message: 'Bad Request.'
  },
  {
    status: 401,
    code: 'unauthorized',
    message: 'Unauthorized.'
  },
  {
    status: 403,
    code: 'forbidden',
    message: 'Access Denied.'    
  },
  {
    status: 404,
    code: 'not_found',
    message: 'Not found.'
  },
  {
    status: 405,
    code: 'method_not_allowed',
    message: 'HTTP Method Not Allowed.'
  },  
  {
    status: 422,
    code: 'validate_failed',
    message: 'Validate Failed.'
  },
  {
    status: 500,
    code: 'server_error',
    message: 'Internal Server Error.'
  }
]

module.exports = {
  htmlStatuses
};
