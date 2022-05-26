// const Sequelize = require('sequelize')
export default function questions (sequelize, DataTypes) {
  return sequelize.define('questions', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'questions',
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
      }
    ]
  })
}
