import { CreateNewError, ParseError } from '../../../frameworks/utils/error'

export default async function deleteAnswer (Answer, params, userId) {
  try {
    return await Answer.destroy({
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
