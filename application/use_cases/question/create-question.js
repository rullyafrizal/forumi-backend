import { CreateNewError, ParseError } from '../../../frameworks/utils/error.js'
import sanitizeHtml from 'sanitize-html'

export default async function createQuestion (Question, body, userId) {
  try {
    return await Question.create({
      title: body.title,
      body: sanitizeHtml(body.body),
      subject: body.subject,
      user_id: userId
    })
  } catch (err) {
    const newError = ParseError(err)
    throw new CreateNewError(newError.message, newError.field, newError.description)
  }
}
