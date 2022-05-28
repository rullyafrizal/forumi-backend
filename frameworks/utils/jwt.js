import jwtConfig from '../../config/jwt.js'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { CreateNewError } from './error.js'

export default function jwtHelper () {
  const generateToken = (user) => {
    const payload = {
      iss: 'forumi',
      sub: user.name,
      iat: moment().unix(),
      user
    }

    return jwt.sign(payload, jwtConfig.secret, {
      expiresIn: `${jwtConfig.expiresIn}s`
    })
  }

  const getToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1]
    } else if (req.query && req.query.token) {
      return req.query.token
    } else if (req.cookies && req.cookies.token) {
      return req.cookies.token
    }

    return null
  }

  const decode = (token) => {
    return jwt.decode(token, { complete: true })
  }

  const extractUserId = (token) => {
    return decode(token).payload.user.id
  }

  const verifyToken = async token => {
    try {
      await jwt.verify(token, jwtConfig.secret)
    } catch (err) {
      throw CreateNewError('Invalid token', 'token', 'invalid token')
    }
  }

  return {
    generateToken,
    getToken,
    decode,
    extractUserId,
    verifyToken
  }
}
