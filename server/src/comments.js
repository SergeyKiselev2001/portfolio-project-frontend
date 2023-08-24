/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')
const {
  checkAuth,
  getDB,
  commentsUtils,
  r200,
  r500,
  r401,
  r403,
  checkAdmin,
  getUserIdByHeaderJWT,
} = require('./utils')
const { filterCommentsByPostID } = commentsUtils

module.exports = {
  getComments: (req, res) => {
    try {
      const { comments = [], users = [] } = getDB()
      const { limit = 0, start = 0, end = 0, post_id = 0 } = req.query

      let result = comments

      if (post_id) result = filterCommentsByPostID(post_id, result)

      res.setHeader('X-Total-Count', result.length)

      if (limit) result = result.slice(0, limit)
      if (start && end) result = result.slice(start, end)

      result = result.map((comment) => {
        const { user_id, post_id, ...rest } = comment

        const userFromDB = users.find((user) => user.id == user_id)

        return {
          ...rest,
          post_id,
          author: {
            name: userFromDB.login,
            id: user_id,
            avatar: { ...userFromDB.avatar },
          },
        }
      })

      return r200(res, result)
    } catch {
      return r500(res, 'Ошибка получения комментариев')
    }
  },
  createComment: async (req, res) => {
    if (!checkAuth(req)) return r401(res)

    const { users = [], comments = [] } = getDB()
    const newComment = { ...req.body, timestamp: +Date.now() }

    const userFromDB = users.find((user) => user.id == req.body.user_id)
    const biggestID = comments.sort((first, second) =>
      first.id > second.id ? -1 : 1
    )[0].id

    try {
      await fetch('http://localhost:5432/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      })

      const { user_id, post_id, ...rest } = newComment

      const result = {
        ...rest,
        id: biggestID + 1,
        author: {
          name: userFromDB.login,
          id: userFromDB.id,
          avatar: { ...userFromDB.avatar },
        },
      }

      return r200(res, result)
    } catch {
      return r500(res, 'Ошибка добавления комментария')
    }
  },

  deleteComment: (req, res, next) => {
    const { comments = [] } = getDB()
    const commentAuthorID = comments.find(
      (comment) => comment.id == req.params.id
    ).user_id

    if (
      req.headers['cascade-delete'] ||
      checkAdmin(req) ||
      commentAuthorID == getUserIdByHeaderJWT(req)
    ) {
      next()
    } else return r403(res)
  },
}
