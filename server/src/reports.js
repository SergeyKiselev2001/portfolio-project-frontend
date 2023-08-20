/* eslint-disable @typescript-eslint/no-var-requires */
const {
  checkAuth,
  r401,
  getDB,
  getUserIdByHeaderJWT,
  r422,
  checkAdmin,
  r403,
  r200,
} = require('./utils')

module.exports = {
  getAllReports: async (req, res) => {
    if (!checkAdmin(req)) return r403(res)
    const { reports = [], users = [], posts = [] } = getDB()

    const result = reports.map(({ id, post_id, user_id }) => {
      const post_title = posts.find((post) => post.id == post_id).title
      const user_login = users.find((user) => user.id == user_id).login

      return {
        id,
        post_id,
        post_title,
        user_login,
      }
    })

    return r200(res, result)
  },

  sendReport: async (req, res, next) => {
    if (!checkAuth(req)) return r401(res)

    const user_id = getUserIdByHeaderJWT(req)

    const { post_id } = req.body
    const { reports = [] } = getDB()

    req.body = { post_id, user_id }

    console.log(post_id, user_id)

    if (reports.find((el) => el.post_id == post_id && el.user_id == user_id)) {
      return r422(res, 'Вы уже отправляли жалобу на этот пост')
    } else {
      next()
    }
  },

  deleteReport: (req, res, next) => {
    if (checkAdmin(req) || req.headers['cascade-delete']) {
      next()
    } else return r403(res)
  },
}
