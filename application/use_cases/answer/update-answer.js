import { CreateNewError, ParseError } from '../../../frameworks/utils/error'
import sanitizeHtml from 'sanitize-html'

export default async function updateAnswer (Answer, params, body, userId) {
  try {
    return await Answer.update({
      body: sanitizeHtml(body.body)
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
