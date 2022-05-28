export default async function destroyQuestion (Question, Answer, params, userId) {
  const tx = await Question.sequelize.transaction()
  try {
    const question = await Question.findOne({
      where: {
        id: params.id,
        user_id: userId
      },
      attributes: ['id']
    })

    if (question) {
      await Answer.destroy({
        where: {
          question_id: params.id
        },
        transaction: tx
      })

      await Question.destroy({
        where: {
          id: params.id
        },
        transaction: tx
      })
    }

    await tx.commit()
  } catch (err) {
    await tx.rollback()
    return err
  }
}
