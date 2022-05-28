import { CreateNewError, ParseError } from '../../../frameworks/utils/error'

export default async function createAnswer (Answer, body, userId) {
  try {
    return await Answer.create({
      body: body.body,
      question_id: body.question_id,
      user_id: userId
    })
  } catch (err) {
    const newError = ParseError(err)
    throw new CreateNewError(newError.message, newError.field, newError.description)
  }
}
