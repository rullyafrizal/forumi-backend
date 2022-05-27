export default function baseValidator () {
  /**
   *
   * @param Schema
   * @param params
   * @returns {{data, success: boolean}|{success: boolean, message, error: any}}
   */
  const validateParam = (Schema, params) => {
    const validate = Schema.validate(params)
    if (validate.error) {
      return {
        success: false,
        message: validate.error.message,
        error: validate.error.details
      }
    }

    return {
      success: true,
      data: validate.value
    }
  }

  /**
   *
   * @param Schema
   * @param params
   * @returns {{data, success: boolean}|{success: boolean, message, error: any}}
   */
  const validateParamAsync = async (Schema, params) => {
    return Schema.validateAsync(params)
      .then(validate => {
        return {
          success: true,
          data: validate
        }
      })
      .catch(error => {
        return {
          success: false,
          message: error.message,
          error: error.details
        }
      })
  }

  /**
   *
   * @param Schema
   * @param query
   * @returns {{data, success: boolean}|{success: boolean, message, error: any}}
   */
  const validateQuery = (Schema, query) => {
    const validate = Schema.validate(query)
    if (validate.error) {
      return {
        success: false,
        message: validate.error.message,
        error: validate.error.details
      }
    }

    return {
      success: true,
      data: validate
    }
  }

  /**
   *
   * @param Schema
   * @param request
   * @returns {{data, success: boolean}|{success: boolean, message, error: any}}
   */
  const validateQueryAsync = (Schema, query) => {
    return Schema.validateAsync(query)
      .then((validate) => {
        return {
          success: true,
          data: validate
        }
      }).catch(error => {
        return {
          success: false,
          message: error.message,
          error: error.details
        }
      })
  }

  /**
   *
   * @param Schema
   * @param body
   * @param files
   * @param allowUnknown
   * @returns {{data, success: boolean}|{success: boolean, message, error: any}}
   */
  const validateBody = (Schema, body, files = undefined, allowUnknown = false) => {
    const validate = Schema.validate(body, {
      allowUnknown
    })
    if (validate.error) {
      return {
        success: false,
        message: validate.error.message,
        error: validate.error.details
      }
    }

    if (files) validate.value.files = files

    return {
      success: true,
      data: validate.value
    }
  }

  /**
   *
   * @param Schema
   * @param body
   * @param files
   * @param allowUnknown
   * @returns {Promise<{success: boolean, message, error: (*|string)}|{data: any, success: boolean}|{success: boolean, message, error: any}>}
   */
  const validateBodyAsync = async (Schema, body, files = undefined, allowUnknown = false) => {
    try {
      const validate = await Schema.validateAsync(body, {
        allowUnknown
      })
      if (validate.error) {
        return {
          success: false,
          message: validate.error.message,
          error: validate.error.details
        }
      }

      if (files) validate.files = files

      return {
        success: true,
        data: validate
      }
    } catch (e) {
      return {
        success: false,
        message: e.message,
        error: e.details ? (e.details[0] ? e.details[0] : '') : ''
      }
    }
  }

  return {
    validateParam,
    validateParamAsync,
    validateQuery,
    validateQueryAsync,
    validateBody,
    validateBodyAsync
  }
}
