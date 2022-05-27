import Joi from 'joi'
import base from './base.js'

export default function authValidator () {
  const validateLogin = (body) => {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }

    return base().validateBody(
      Joi.object().keys(schema),
      body
    )
  }

  const validateRegister = (body) => {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().required()
    }

    return base().validateBody(Joi.object().keys(schema), body)
  }

  return {
    validateLogin,
    validateRegister
  }
}
