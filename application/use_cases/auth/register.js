import bcryptHelper from '../../../frameworks/utils/bcrypt.js'
import { CreateNewError, ParseError } from '../../../frameworks/utils/error.js'

export default async function register (body, user) {
  try {
    await user.create({
      name: body.name,
      email: body.email,
      password: bcryptHelper().hash(body.password),
      avatar: `https://ui-avatars.com/api/?name=${body.name}&background=0D8ABC&color=fff&size=128`
    })
  } catch (err) {
    const newError = ParseError(err)
    throw new CreateNewError(newError.message, newError.field, newError.description)
  }
}
