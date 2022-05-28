import { CreateNewError, ParseError } from '../../../frameworks/utils/error'

export default async function updateAnswer (Answer, params, body, userId) {
  try {
    return await Answer.update({
      body: body.body
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
