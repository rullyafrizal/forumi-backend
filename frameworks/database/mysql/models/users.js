// const Sequelize = require('sequelize')
export default function users (sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: 'users_email_unique'
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true,
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
        name: 'users_email_unique',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'email' }
        ]
      }
    ]
  })
}
