export default function baseHandler () {
  const successResponse = (res, message = 'Success', data = null, statusCode = 200) => {
    return res.status(statusCode)
      .send({
        status_code: statusCode,
        message,
        data
      })
  }

  const badRequest = (res, message = 'Bad Request', data = null) => {
    const statusCode = 400
    return res.status(statusCode)
      .send({
        status_code: statusCode,
        message,
        details: data
      })
  }

  const forbidden = (res, message = 'Forbidden') => {
    const statusCode = 403
    return res.status(statusCode)
      .send({
        status_code: statusCode,
        message
      })
  }

  const internalErrorResponse = (res, message, error) => {
    const statusCode = 500
    return res.status(statusCode)
      .send({
        status_code: statusCode,
        message,
        details: process.env.DEBUG === 'true' ? error.stack : 'error stack can be showed'
      })
  }

  const unprocessableEntityResponse = (res, message, validation) => {
    const statusCode = 422
    return res.status(statusCode)
      .send({
        status_code: statusCode,
        message,
        details: validation
      })
  }

  const notFoundResponse = (res, message = 'Not Found') => {
    const statusCode = 404
    return res.status(statusCode)
      .send({
        status_code: statusCode,
        message
      })
  }

  return {
    successResponse,
    badRequest,
    forbidden,
    internalErrorResponse,
    unprocessableEntityResponse,
    notFoundResponse
  }
}
