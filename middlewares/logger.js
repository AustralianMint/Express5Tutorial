//function which logs human readable time.
export const logger = (request, response, next) => {
  console.log(
    new Date().toUTCString(),
    'Request from',
    request.ip,
    request.method,
    request.originalUrl
  )
  next()
}
