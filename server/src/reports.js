/* eslint-disable @typescript-eslint/no-var-requires */
const {
  checkAuth,
  r401,
  getDB,
  getUserIdByHeaderJWT,
  r422,
} = require('./utils')

module.exports = {
  sendReport: async (req, res, next) => {
    if (!checkAuth(req)) return r401(res)

    const user_id = getUserIdByHeaderJWT(req)

    const { post_id } = req.body
    const { reports = [] } = getDB()

    req.body = { post_id, user_id }

    if (reports.find((el) => el.post_id == post_id && user_id == user_id)) {
      return r422(res, 'Вы уже отправляли жалобу на этот пост')
    } else {
      console.log('FETCH')
      next()
    }
  },
}
