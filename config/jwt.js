export default {
  secret: process.env.JWT_SECRET || 'secret',
  expiresIn: process.env.JWT_TTL || '86400'
}
