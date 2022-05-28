import authHandler from '../../../adapters/handlers/auth.js'

export default function authRouter (express, models) {
  const router = express.Router()

  // load controller with dependencies
  const controller = authHandler(models.User)

  // POST enpdpoints
  router.route('/login').post(controller.loginUser)
  router.route('/register').post(controller.registerUser)

  return router
}
