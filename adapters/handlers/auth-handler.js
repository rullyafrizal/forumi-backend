import login from '../../application/use_cases/auth/login.js'
import register from '../../application/use_cases/auth/register.js'
import baseHandler from './base-handler.js'

export default function authController (user) {
  const loginUser = (req, res, next) => {
    const { email, password } = req.body

    login(email, password, user)
      .then((token) => {
        baseHandler().successResponse(res, 'User logged in successfully', token)
      })
      .catch((err) => next(err))
  }

  const registerUser = (req, res, next) => {
    const { body } = req

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
