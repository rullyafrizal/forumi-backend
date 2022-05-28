import { CreateNewError, ParseError } from '../../../frameworks/utils/error'

export default async function updateQuestion (Question, params, body, userId) {
  try {
    return await Question.update({
      question: body.question,
      subject: body.subject
    }, {
      where: {
        id: params.id,
        user_id: userId
      }
    })
  } catch (err) {
    const newError = ParseError(err)
    throw new CreateNewError(newError.message, newError.field, newError.description)
  }
}
