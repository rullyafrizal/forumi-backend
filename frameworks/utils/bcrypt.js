import bcrypt from 'bcrypt'

export default function bcryptHelper () {
  const hash = (plainText) => {
    return bcrypt.hashSync(plainText, 10)
  }

  const compare = (plainText, hash) => {
    return bcrypt.compareSync(plainText, hash)
  }

  return {
    hash,
    compare
  }
}
