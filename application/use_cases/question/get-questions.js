import { CreateNewError, ParseError } from '../../../frameworks/utils/error.js'
import { Op } from 'sequelize'
import paginationHelper from '../../../frameworks/utils/pagination'

export default async function getQuestions (Question, User, query) {
  try {
    const {
      search,
      perPage,
      currentPage,
      sort
    } = paginationHelper().sanitizeQuery(query)

    const sequelizeOptions = paginationHelper().buildOptions({
      perPage, currentPage, sort
    })

    sequelizeOptions.where = {}

    if (search) {
      sequelizeOptions.where[Op.or] = [
        { question: { [Op.like]: `%${search}%` } },
        { subject: { [Op.like]: `%${search}%` } }
      ]
    }

    sequelizeOptions.attributes = [
      'id', 'title', 'subject',
      'created_at', 'updated_at'
    ]

    sequelizeOptions.include = [{
      model: User,
      attributes: ['id', 'name'],
      as: 'user'
    }]

    const { count, rows } = await Question.findAndCountAll(sequelizeOptions)

    return {
      questions: rows,
      pagination: paginationHelper().buildPagination({
        perPage, currentPage, count
      })
    }
  } catch (err) {
    const newError = ParseError(err)
    throw new CreateNewError(newError.message, newError.field, newError.description)
  }
}
