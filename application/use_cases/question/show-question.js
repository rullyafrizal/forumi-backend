export default async function getQuestionById (Question, User, Answer, params) {
  const { id } = params

  const question = await Question.findOne({
    attributes: ['id', 'question', 'subject', 'createdAt'],
    where: {
      id
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name'],
        as: 'user'
      },
      {
        model: Answer,
        attributes: ['id', 'body', 'createdAt'],
        as: 'answers',
        include: [
          {
            model: User,
            attributes: ['id', 'name'],
            as: 'user'
          }
        ]
      }
    ]
  })

  return question
}
