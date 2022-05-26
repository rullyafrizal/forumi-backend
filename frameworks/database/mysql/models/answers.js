// const Sequelize = require('sequelize')
export default function answers (sequelize, DataTypes) {
  return sequelize.define('answers', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    question_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'questions',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'answers',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' }
        ]
      },
      {
        name: 'answers_question_id_foreign',
        using: 'BTREE',
        fields: [
          { name: 'question_id' }
        ]
      },
      {
        name: 'answers_user_id_foreign',
        using: 'BTREE',
        fields: [
          { name: 'user_id' }
        ]
      }
    ]
  })
}
