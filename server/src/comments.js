/* eslint-disable @typescript-eslint/no-var-requires */
const { checkAuth, getDB } = require('./utils')

module.exports = {
  createComment: (req, res, next) => {
    // checkAuth(req, res)
    // const { posts = [] } = getDB()
    // const targetPost = posts.find((post) => post.id == req.body.post_id)
    // targetPost.commentsAmount = targetPost.commentsAmount + 1
    // fetch('http://localhost:5432/posts/' + req.body.post_id, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(targetPost),
    // })
    // next()
  },
}
