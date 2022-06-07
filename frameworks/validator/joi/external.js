import { ValidationError } from 'joi'

export default function externalJoi (models) {
  const generateValidationError = (message, type, ctx) => {
    return new ValidationError(message, [{
      message,
      type,
      context: {
        ...ctx
      }
    }])
  }

  const checkQuestionById = async (question_id, ctx) => {
    try {
      const question = await models.Question.findOne({
        attributes: ['id'],
        where: {
          id: question_id
        }
      })

      if (!question) {
        throw generateValidationError('Question not found', 'not_found', ctx)
      }
    } catch (err) {
      throw generateValidationError(err.message, 'not_found', ctx)
    }
  }

  const checkDuplicateUserByEmail = async (email, ctx) => {
    try {
      const user = await models.User.findOne({
        attributes: ['id'],
        where: {
          email
        }
      })

      if (user) {
        throw generateValidationError('Email already registered', 'duplicate', ctx)
      }
    } catch (err) {
      throw generateValidationError(err.message, 'duplicate', ctx)
    }
  }

  const checkAnswerById = async (answer_id, ctx) => {
    try {
      const answer = await models.Answer.findOne({
        attributes: ['id'],
        where: {
          id: answer_id
        }
      })

      if (!answer) {
        throw generateValidationError('Answer not found', 'not_found', ctx)
      }
    } catch (err) {
      throw generateValidationError(err.message, 'not_found', ctx)
    }
  }

  return {
    generateValidationError,
    checkQuestionById,
    checkAnswerById,
    checkDuplicateUserByEmail
  }
}
