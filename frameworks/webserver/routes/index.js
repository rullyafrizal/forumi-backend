import authRouter from './auth.js'
import questionRouter from './question.js'
import answerRouter from './answer'

export default function routes (app, express, models) {
  app.use('/api/v1/auth', authRouter(express, models))
  app.use('/api/v1/questions', questionRouter(express, models))
  app.use('/api/v1/answers', answerRouter(express, models))
}
