import questionController from '../../../adapters/handlers/question.js'
import authMiddleware from '../middlewares/auth-middleware.js'

export default function questionRouter (express, models) {
  const router = express.Router()

  const controller = questionController(
    models.Question,
    models.User,
    models.Answer
  )

  router.route('/').post(authMiddleware, controller.create)
  router.route('/').get(authMiddleware, controller.index)
  router.route('/:id').get(authMiddleware, controller.show)
  router.route('/:id').put(authMiddleware, controller.update)
  router.route('/:id').delete(authMiddleware, controller.destroy)

  return router
}
