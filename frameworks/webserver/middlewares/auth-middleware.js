import jwtHelper from '../../utils/jwt.js'
import jwt from 'jsonwebtoken'

export default function authMiddleware (req, res, next) {
  const token = jwtHelper().getToken(req)

  if (!token) {
    return res.status(401).json({
      status_code: 401,
      message: 'Unauthorized',
      error: 'Please provide a token'
    })
  }

  jwtHelper().verifyToken(token)
    .then(() => {
      next()
    })
    .catch(e => {
      if (e instanceof jwt.JsonWebTokenError || e instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          status_code: 401,
          message: 'Invalid Token',
          error: e.message
        })
      }

      return res.status(500).json({
        status_code: 500,
        message: 'An error occurred',
        error: e.message
      })
    })
}
