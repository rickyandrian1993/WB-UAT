const error500 = {
  isError: true,
  status: 500,
  message: 'Internal Server Error.'
}

const success200 = {
  isError: false,
  status: 200,
  message: 'Berhasil.'
}

const error403 = {
  isError: true,
  status: 403,
  message: 'Forbidden.'
}

export { error500, success200, error403 }
