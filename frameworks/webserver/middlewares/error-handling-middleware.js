export default function errorHandlingMiddlware (err, req, res, next) {
  err.statusCode = err.statusCode || 404

  if (err.customMessage || err.message) {
    return res.status(err.statusCode).json({
      status_code: err.statusCode,
      message: err.customMessage || err.message
    })
  }

  return res.status(err.statusCode).json({
    status_code: err.statusCode, message: err
  })
}
