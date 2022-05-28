import authMiddleware from '../middlewares/auth-middleware.js'
import answerController from '../../../adapters/handlers/answer'

export default function answerRouter (express, models) {
  const router = express.Router()

  const controller = answerController(
    models.Question,
    models.Answer
  )

  router.route('/').post(authMiddleware, controller.create)
  router.route('/:id').put(authMiddleware, controller.update)
  router.route('/:id').delete(authMiddleware, controller.destroy)

  return router
}
