import Joi from 'joi'

export default function baseValidator () {
  /**
   *
   * @param schema
   * @param params
   * @returns {{data, success: boolean}|{success: boolean, message, error: any}}
   */
  const validateParam = (schema, params) => {
    const joiSchema = Joi.object().keys(schema)
    const validate = joiSchema.validate(params)

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
   * @param schema
   * @param params
   * @returns {{data, success: boolean}|{success: boolean, message, error: any}}
   */
  const validateParamAsync = async (schema, params) => {
    const joiSchema = Joi.object().keys(schema)

    return joiSchema.validateAsync(params)
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
   * @param schema
   * @param query
   * @returns {{data, success: boolean}|{success: boolean, message, error: any}}
   */
  const validateQuery = (schema, query) => {
    const joiSchema = Joi.object().keys(schema)

    const validate = joiSchema.validate(query)
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
   * @param schema
   * @param query
   * @returns {{data, success: boolean}|{success: boolean, message, error: any}}
   */
  const validateQueryAsync = (schema, query) => {
    const joiSchema = Joi.object().keys(schema)

    joiSchema.validateAsync(query)
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
   * @param schema
   * @param body
   * @param files
   * @param allowUnknown
   * @returns {{data, success: boolean}|{success: boolean, message, error: any}}
   */
  const validateBody = (schema, body, files = undefined, allowUnknown = false) => {
    const joiSchema = Joi.object().keys(schema)

    const validate = joiSchema.validate(body, {
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
   * @param schema
   * @param body
   * @param files
   * @param allowUnknown
   * @returns {Promise<{success: boolean, message, error: (*|string)}|{data: any, success: boolean}|{success: boolean, message, error: any}>}
   */
  const validateBodyAsync = async (schema, body, files = undefined, allowUnknown = false) => {
    try {
      const joiSchema = Joi.object().keys(schema)

      const validate = await joiSchema.validateAsync(body, {
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
