export function CreateNewError (message, field = null, description = null) {
  const errorMessage = {
    message,
    details: []
  }

  if (field != null && description != null) {
    errorMessage.details = [
      {
        fieldViolations: [
          {
            field,
            description
          }
        ]
      }
    ]
  }
  return errorMessage
}

export function ParseError (error) {
  try {
    const message = error.errors.name.properties.message
    const description = error.errors.name.properties.type
    const field = error.errors.name.properties.type

    return {
      message,
      field,
      description
    }
  } catch {
    throw error
  }
}

export function HandleError (error) {
  try {
    const { message, field, description } = ParseError(error)
    return CreateNewError(message, field, description)
  } catch {
    throw error
  }
}
