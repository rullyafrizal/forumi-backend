export default function paginationHelper () {
  /**
   * Returns a normalized search value (must be in lowercase)
   * or undefined if no value received.
   *
   * @param {String | undefined} search - The search query
   * @returns {String | undefined}
   */
  const normalizeSearch = (search) => {
    if (!search || !search.trim().length) return
    return search.toLowerCase()
  }

  /**
   * Returns a normalized per page value (as a number)
   * or a default value of 10 in exchange.
   *
   * @param {number} perPage - The per page query
   * @returns {Number}
   */
  const normalizePerPage = (perPage = 10) => {
    if (typeof perPage === 'string') return parseInt(perPage)
    return perPage
  }

  /**
   * Returns a normalized per page value (as a number)
   * or a default value of 10 in exchange.
   *
   * @returns {Number}
   * @param currentPage
   */
  const normalizeCurrentPage = (currentPage = 1) => {
    if (typeof currentPage === 'string') return parseInt(currentPage)
    return currentPage
  }

  /**
   * Returns a normalized sort value. The given sort
   * should be in a form of:
   * <field>,<ASC|DESC|asc|desc>
   *
   * @param {String | undefined} sort - The sort query
   * @returns {{
   *  field: string;
   *  order: string;
   * } | undefined}
   */
  const normalizeSort = (sort) => {
    if (!sort) return

    const sortPattern = sort.split(',')

    // As is email,asc splitted by ',' will return
    // [email, asc], the length should be exactly 2
    if (sortPattern.length !== 2) return undefined

    // We wanna force the attributes of sort field to always asc if it is not
    // either 'asc' or 'desc', this is used to prevent potential sorting bug.
    if (!['asc', 'desc'].includes(sortPattern[1].toLowerCase())) sortPattern[1] = 'asc'

    return {
      field: sortPattern[0],
      order: sortPattern[1].toUpperCase()
    }
  }

  /**
   * Returns a normalized status value.
   *
   * @enum {Status} = {"ACTIVE" = 1, "INACTIVE" = 0}
   * @param {String | undefined} status - The status query
   * @returns {number | String}
   */
  const normalizeStatus = (status) => {
    if (!status) return

    switch (status) {
    case 'active':
    case 'true':
      return 1
    case 'inactive':
    case 'false':
      return 0
    default:
      return status
    }
  }

  /**
   * Make pagination query a safe-type with normalized and default value.
   *
   * @param {Express.Response.Query} query - The query from the request object.
   * @param {String} query.search - The search query.
   * @param {String} query.per_page - The per page query.
   * @param {String} query.current_page - The current page query.
   * @param {String} query.sort - The sort query.
   * @param {String} query.status - The status query.
   * @returns {
   *  search: string;
   *  perPage: string;
   *  currentPage: string;
   *  sort: string;
   *  status: string;
   * }
   */
  const sanitizeQuery = (query) => {
    const normalizedSearch = normalizeSearch(query.search)
    const normalizedPerPage = normalizePerPage(query.per_page)
    const normalizedCurrentPage = normalizeCurrentPage(query.current_page)
    const normalizedSort = normalizeSort(query.sort)

    return {
      search: normalizedSearch,
      perPage: normalizedPerPage,
      currentPage: normalizedCurrentPage,
      sort: normalizedSort
    }
  }

  /**
   * Build a query configuration for sequelize configs.
   *
   * @param {Object} query - The query object.
   * @param {Number} query.perPage - The per page value.
   * @param {Number} query.currentPage - The current page value.
   * @param {Object | undefined} query.sort - The sort object.
   * @param {String} query.sort.field - The sort field value.
   * @param {String} query.sort.order - The sort order value.
   * @param {Array<String | Model>} query.models - The array which holds Model definition.
   * @returns {Object} - The sequelize pagination object.
   */
  const buildOptions = ({ perPage, currentPage, sort, models = [] }) => {
    const config = {
      offset: perPage * (currentPage - 1),
      limit: perPage
    }

    if ((typeof sort === 'object' && Object.keys(sort).length > 0)) {
      config.order = []

      if (models.length) {
        config.order.push([...models, sort.field, sort.order])
      } else {
        config.order.push([sort.field, sort.order])
      }
    }

    return config
  }

  /**
   * Construct the pagination response boilerplate object.
   *
   * @param {Object} Pagination - The pagination interface.
   * @param {Number} Pagination.perPage - The pagination per page value.
   * @param {Number} Pagination.currentPage - The pagination current page value.
   * @param {Number} Pagination.count - The data count in total value.
   * @returns {
   *  per_page: string;
   *  current_page: string;
   *  total_pages: string;
   *  total_items: string;
   *  from_item: string;
   *  to_item: string;
   * }
   */
  const buildPagination = ({ perPage, currentPage, count }) => {
    return {
      per_page: perPage,
      current_page: currentPage,
      total_pages: Math.ceil(count / perPage),
      total_items: count,
      from_item: (currentPage) * (perPage) - (perPage) + 1,
      to_item: (currentPage) * (perPage)
    }
  }

  return {
    normalizeSearch,
    normalizePerPage,
    normalizeCurrentPage,
    normalizeSort,
    normalizeStatus,
    sanitizeQuery,
    buildOptions,
    buildPagination
  }
}
