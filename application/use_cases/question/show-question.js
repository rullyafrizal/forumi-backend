export default async function getQuestionById (Question, User, Answer, params) {
  const { id } = params

  return await Question.findOne({
    attributes: ['id', 'title', 'body', 'subject', 'createdAt'],
    where: {
      id
    },
    include: [
      {
        model: User,
        attributes: ['id', 'email', 'name', 'avatar'],
        as: 'user'
      },
      {
        model: Answer,
        attributes: ['id', 'body', 'createdAt'],
        as: 'answers',
        include: [
          {
            model: User,
            attributes: ['id', 'email', 'name', 'avatar'],
            as: 'user'
          }
        ]
      }
    ]
  })
}
