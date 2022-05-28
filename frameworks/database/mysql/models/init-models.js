import { DataTypes } from 'sequelize'
import _answers from './answers.js'
import _migrations from './migrations.js'
import _questions from './questions.js'
import _users from './users.js'

export default function initModels (sequelize) {
  const Answer = _answers(sequelize, DataTypes)
  const Migration = _migrations(sequelize, DataTypes)
  const Question = _questions(sequelize, DataTypes)
  const User = _users(sequelize, DataTypes)

  Answer.belongsTo(Question, { as: 'question', foreignKey: 'question_id' })
  Question.hasMany(Answer, { as: 'answers', foreignKey: 'question_id' })
  Answer.belongsTo(User, { as: 'user', foreignKey: 'user_id' })
  User.hasMany(Answer, { as: 'answers', foreignKey: 'user_id' })
  User.hasMany(Question, { as: 'questions', foreignKey: 'user_id' })
  Question.belongsTo(User, { as: 'user', foreignKey: 'user_id' })

  return {
    Answer,
    Migration,
    Question,
    User
  }
}
