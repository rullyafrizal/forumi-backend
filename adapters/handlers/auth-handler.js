import login from '../../application/use_cases/auth/login.js'
import register from '../../application/use_cases/auth/register.js'
import baseHandler from './base-handler.js'
import authValidator from '../../application/validator/auth.js'

export default function authController (user) {
  const loginUser = (req, res, next) => {
    const { email, password } = req.body

    const { success, message, error } = authValidator().validateLogin(req.body)

    if (!success) {
      baseHandler().badRequest(res, message, error)
    }

    login(email, password, user)
      .then((token) => {
        baseHandler().successResponse(res, 'User logged in successfully', token)
      })
      .catch((err) => next(err))
  }

  const registerUser = (req, res, next) => {
    const { body } = req

    const { success, message, error } = authValidator().validateRegister(body)

    if (!success) {
      baseHandler().badRequest(res, message, error)
    }

    register(body, user)
      .then((user) => {
        baseHandler().successResponse(res, 'User registered successfully', null)
      })
      .catch((err) => next(err))
  }

  return {
    loginUser,
    registerUser
  }
}
