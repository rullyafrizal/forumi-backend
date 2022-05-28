import jwtHelper from '../../frameworks/utils/jwt.js'
import baseHandler from '../../frameworks/webserver/handlers/base-handler.js'
import createQuestion from '../../application/use_cases/question/create-question.js'
import questionValidator from '../../application/validator/question'
import getQuestions from '../../application/use_cases/question/get-questions'
import getQuestionById from '../../application/use_cases/question/show-question'
import updateQuestion from '../../application/use_cases/question/update-question'
import destroyQuestion from '../../application/use_cases/question/destroy-question'

export default function questionController (Question, User, Answer) {
  const create = async (req, res, next) => {
    try {
      const { success, message, error } = questionValidator().validateStore(req.body)

      if (!success) {
        baseHandler().badRequest(res, message, error)
      }

      const token = jwtHelper().getToken(req)
      const question = await createQuestion(Question, req.body, jwtHelper().extractUserId(token))

      baseHandler().successResponse(res, 'success:create:question', question)
    } catch (err) {
      next(err)
    }
  }

  const index = async (req, res, next) => {
    try {
      const questions = await getQuestions(Question, User, req.query)

      baseHandler().successResponse(res, 'success:get:questions', questions)
    } catch (err) {
      next(err)
    }
  }

  const show = async (req, res, next) => {
    try {
      const { success, message, error } = await questionValidator().validateShow(Question, req.params)

      if (!success) {
        baseHandler().badRequest(res, message, error)
      }

      const question = await getQuestionById(Question, User, Answer, req.params)

      baseHandler().successResponse(res, 'success:get:question', question)
    } catch (err) {
      next(err)
    }
  }

  const update = async (req, res, next) => {
    try {
      const token = jwtHelper().getToken(req)

      const { success, message, error } = await questionValidator()
        .validateUpdate(Question, req.body, req.params, token)

      if (!success) {
        baseHandler().badRequest(res, message, error)
      }

      await updateQuestion(Question, req.params, req.body, jwtHelper().extractUserId(token))

      baseHandler().successResponse(res, 'success:update:question', null)
    } catch (err) {
      next(err)
    }
  }

  const destroy = async (req, res, next) => {
    try {
      const token = jwtHelper().getToken(req)

      const { success, message, error } = await questionValidator()
        .validateDestroy(Question, req.params, token)

      if (!success) {
        baseHandler().badRequest(res, message, error)
      }

      await destroyQuestion(Question, Answer, req.params, jwtHelper().extractUserId(token))

      baseHandler().successResponse(res, 'success:delete:question', null)
    } catch (err) {
      next(err)
    }
  }

  return {
    create,
    index,
    show,
    update,
    destroy
  }
}
