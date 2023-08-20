/* eslint-disable @typescript-eslint/no-var-requires */
const { r403, checkAdmin } = require('./utils')

module.exports = {
  deleteSave: (req, res, next) => {
    if (checkAdmin(req) || req.headers['cascade-delete']) {
      next()
    } else return r403(res)
  },
}
