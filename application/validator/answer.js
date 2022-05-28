import Joi from 'joi'
import externalJoi from '../../frameworks/validator/joi/external'
import baseValidator from '../../frameworks/validator/joi/base'
import jwtHelper from '../../frameworks/utils/jwt'

export default function answerValidator ({ Question, Answer }) {
  const validateStore = async (body) => {
    try {
      const bodySchema = {
        body: Joi.string().required(),
        question_id: Joi.number().integer().positive().required().external(externalJoi({ Question }).checkQuestionById)
      }

      return await baseValidator().validateBodyAsync(bodySchema, body)
    } catch (err) {
      return err
    }
  }

  const validateUpdate = async (body, params, token) => {
    try {
      const paramSchema = {
        id: Joi.string().required().external(externalJoi({ Answer }).checkAnswerById)
      }

      const paramValidate = await baseValidator().validateParamAsync(paramSchema, params)

      if (!paramValidate.success) {
        return paramValidate
      }

      // Check if user is the owner of the answer
      const checkOwnership = await checkAnswerOwnership(params, token)

      if (!checkOwnership.success) {
        return checkOwnership
      }

      const bodySchema = {
        body: Joi.string().required()
      }

      return await baseValidator().validateBody(bodySchema, body)
    } catch (err) {
      return err
    }
  }

  const validateDelete = async (params, token) => {
    try {
      const paramSchema = {
        id: Joi.string().required().external(externalJoi({ Answer }).checkAnswerById)
      }

      const isExist = await baseValidator().validateParamAsync(paramSchema, params)

      if (!isExist.success) {
        return isExist
      }

      // Check if user is the owner of the answer
      return await checkAnswerOwnership(params, token)
    } catch (err) {
      return err
    }
  }

  const checkAnswerOwnership = async (params, token) => {
    try {
      const userId = jwtHelper().extractUserId(token)

      // Check if user is the owner of the answer
      const answer = await Answer.findOne({
        where: {
          id: params.id,
          user_id: userId
        }
      })

      if (!answer) {
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
      return err
    }
  }

  return {
    validateStore,
    validateUpdate,
    validateDelete
  }
}
