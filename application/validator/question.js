import baseValidator from '../../frameworks/validator/joi/base'
import Joi from 'joi'
import externalJoi from '../../frameworks/validator/joi/external'
import jwtHelper from '../../frameworks/utils/jwt'

export default function questionValidator () {
  const validateStore = (body) => {
    const schema = {
      question: Joi.string().required(),
      subject: Joi.string().required()
    }

    return baseValidator().validateBody(schema, body)
  }

  const validateShow = async (Question, params) => {
    try {
      const schema = {
        id: Joi.string().required().external(externalJoi({ Question }).checkQuestionById)
      }

      return await baseValidator().validateParamAsync(schema, params)
    } catch (err) {
      return err
    }
  }

  const validateUpdate = async (Question, body, params, token) => {
    try {
      const paramSchema = {
        id: Joi.string().required().external(externalJoi({ Question }).checkQuestionById)
      }

      const paramValidate = await baseValidator().validateParamAsync(paramSchema, params)

      if (!paramValidate.success) {
        return paramValidate
      }

      const isOwner = await checkQuestionOwnership(Question, params, token)

      if (!isOwner.success) {
        return isOwner
      }

      const schema = {
        question: Joi.string().required(),
        subject: Joi.string().required()
      }

      return await baseValidator().validateBody(schema, body)
    } catch (err) {
      return err
    }
  }

  const validateDestroy = async (Question, params, token) => {
    try {
      const paramSchema = {
        id: Joi.string().required().external(externalJoi({ Question }).checkQuestionById)
      }

      const paramValidate = await baseValidator().validateParamAsync(paramSchema, params)

      if (!paramValidate.success) {
        return paramValidate
      }

      return await checkQuestionOwnership(Question, params, token)
    } catch (err) {
      return err
    }
  }

  const checkQuestionOwnership = async (Question, params, token) => {
    try {
      const userId = jwtHelper().extractUserId(token)

      const question = await Question.findOne({
        attributes: ['id'],
        where: {
          id: params.id,
          user_id: userId
        }
      })

      if (!question) {
        return {
          success: false,
          message: 'failed:unauthorized:resource',
          error: {
            message: 'failed:unauthorized:resource'
          }
        }
      }

      return {
        success: true
      }
    } catch (err) {
      return baseValidator().generateValidationError(err.message, 'not_found')
    }
  }

  return {
    validateStore,
    validateShow,
    validateUpdate,
    validateDestroy
  }
}
