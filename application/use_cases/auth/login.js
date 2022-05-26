import {
  CreateNewError,
  ParseError,
  HandleError
} from '../../../frameworks/utils/error.js'
import bcryptHelper from '../../../frameworks/utils/bcrypt.js'
import moment from 'moment'
import jwtConfig from '../../../config/jwt.js'
import jwtHelper from '../../../frameworks/utils/jwt.js'

export default async function login (email, password, user) {
  try {
    const data = await user.findOne({
      where: {
        email
      },
      attributes: ['id', 'email', 'password', 'name', 'avatar']

    })

    if (!data) {
      // eslint-disable-next-line new-cap
      return HandleError(new Error('User not found'))
    }

    const isValid = bcryptHelper().compare(password, data.password)

    if (!isValid) {
      // eslint-disable-next-line new-cap
      return HandleError(new Error('Password is invalid'))
    }

    const token = {
      type: 'Bearer',
      expiresIn: moment().add(
        jwtConfig.expiresIn,
        'second'
      ).unix(),
      value: jwtHelper().generateToken({
        id: data.id,
        email: data.email
      })
    }

    return {
      token
    }
  } catch (err) {
    const newError = ParseError(err)
    throw new CreateNewError(newError.message, newError.field, newError.description)
  }
}
