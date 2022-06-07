import Joi from 'joi'
import base from '../../frameworks/validator/joi/base.js'
import externalJoi from '../../frameworks/validator/joi/external'

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

  const validateRegister = (User, body) => {
    const schema = {
      email: Joi.string().email().required().external(externalJoi({ User }).checkUserByEmail),
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
