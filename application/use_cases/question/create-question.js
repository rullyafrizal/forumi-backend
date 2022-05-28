import { CreateNewError, ParseError } from '../../../frameworks/utils/error.js'

export default async function createQuestion (Question, body, userId) {
  try {
    return await Question.create({
      question: body.question,
      subject: body.subject,
      user_id: userId
    })
  } catch (err) {
    const newError = ParseError(err)
    throw new CreateNewError(newError.message, newError.field, newError.description)
  }
}