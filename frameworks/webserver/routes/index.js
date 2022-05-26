import authRouter from './auth.js'

export default function routes (app, express, models) {
  // app.use('/api/v1/posts', postRouter(express, redisClient))
  // app.use('/api/v1/users', userRouter(express, redisClient))
  app.use('/api/v1/auth', authRouter(express, models))
}
