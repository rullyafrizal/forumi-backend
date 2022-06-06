import baseHandler from '../../frameworks/webserver/handlers/base-handler'
import answerValidator from '../../application/validator/answer'
import createAnswer from '../../application/use_cases/answer/create-answer'
import jwtHelper from '../../frameworks/utils/jwt'
import updateAnswer from '../../application/use_cases/answer/update-answer'
import deleteAnswer from '../../application/use_cases/answer/delete-answer'

export default function answerController (Question, Answer) {
  const create = async (req, res, next) => {
    try {
      const { success, message, error } = await answerValidator({ Question }).validateStore(req.body)

      if (!success) {
        return baseHandler().badRequest(res, message, error)
      }

      const token = jwtHelper().getToken(req)
      const answer = await createAnswer(Answer, req.body, jwtHelper().extractUserId(token))

      return baseHandler().successResponse(res, 'success:create:answer', answer)
    } catch (err) {
      next(err)
    }
  }

  const update = async (req, res, next) => {
    try {
      const token = jwtHelper().getToken(req)

      const { success, message, error } = await answerValidator({ Answer })
        .validateUpdate(req.body, req.params, token)

      if (!success) {
        return baseHandler().badRequest(res, message, error)
      }

      await updateAnswer(Answer, req.params, req.body, jwtHelper().extractUserId(token))

      return baseHandler().successResponse(res, 'success:update:answer', null)
    } catch (err) {
      next(err)
    }
  }

  const destroy = async (req, res, next) => {
    try {
      const token = jwtHelper().getToken(req)

      const { success, message, error } = await answerValidator({ Answer })
        .validateDelete(req.params, token)

      if (!success) {
        return baseHandler().badRequest(res, message, error)
      }

      await deleteAnswer(Answer, req.params, jwtHelper().extractUserId(token))

      return baseHandler().successResponse(res, 'success:delete:answer', null)
    } catch (err) {
      next(err)
    }
  }

  return {
    create,
    update,
    destroy
  }
}
