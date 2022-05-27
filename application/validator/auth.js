import Joi from 'joi'
import base from '../../frameworks/validator/joi/base.js'

export default function authValidator () {
  const validateLogin = (body) => {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }

    return base().validateBody(
      schema,
      body
    )
  }

  const validateRegister = (body) => {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().required()
    }

    return base().validateBody(schema, body)
  }

  return {
    validateLogin,
    validateRegister
  }
}
