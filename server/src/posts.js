/* eslint-disable @typescript-eslint/no-var-requires */
const { getDB, getUserIdByHeaderJWT, checkAuth } = require('./utils')

module.exports = {
  posts_GET: (req, res) => {
    const {
      posts = [],
      likes = [],
      saves = [],
      comments = [],
      users = [],
    } = getDB()

    const userID = getUserIdByHeaderJWT(req)
    let result = [...posts]

    const page = +req.query['_page'] ? +req.query['_page'] - 1 : 0
    const limit = +req.query['_limit'] || 0
    const authorName = req.query['author.name']

    if (authorName) {
      result = result.filter(
        (el) =>
          el.author_id == users.find((user) => user.login == authorName).id
      )
    }

    res.setHeader('X-Total-Count', result.length)

    if (limit) {
      result = result.slice(page * limit, page * limit + limit)
    }

    result = result.map((onePost) => {
      const { author_id, ...el } = onePost

      const id = el.id
      const author = users.find((el2) => el2.id == author_id)
      const { avatar, login } = author

      let likesAmount = 0
      likes.forEach((like) => {
        if (like.post_id == id) {
          likesAmount = likesAmount + 1
        }
      })

      let commentsAmount = 0
      comments.forEach((comment) => {
        if (comment.post_id == id) {
          commentsAmount = commentsAmount + 1
        }
      })

      const isSaved = Boolean(
        userID &&
          saves
            .filter((like) => like.post_id == id)
            .find((el) => el.user_id == userID)
      )

      const isLiked = Boolean(
        userID &&
          likes
            .filter((like) => like.post_id == id)
            .find((el) => el.user_id == userID)
      )

      return {
        ...el,
        isSaved,
        isLiked,
        likesAmount,
        commentsAmount,
        author: {
          avatar,
          id: author.id,
          name: login,
        },
      }
    })

    return res.status(200).json(result)
  },
  post_like_POST: async (req, res) => {
    console.log('LIKE START', req.headers)
    if (!checkAuth(req)) {
      return res.status(401).json({ message: 'Unauthorized Error' })
    }

    const userID = getUserIdByHeaderJWT(req)

    try {
      await fetch('http://localhost:5432/likes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: +req.params.id,
          user_id: +userID,
        }),
      })

      return res.status(200)
    } catch (e) {
      return res.status(500)
    }
  },
  post_dislike_DELETE: async (req, res) => {
    if (!checkAuth(req)) {
      return res.status(401).json({ message: 'Unauthorized Error' })
    }

    const { likes = [] } = getDB()

    const userID = getUserIdByHeaderJWT(req)

    const relationId = likes.find((like) => {
      return like.post_id == req.params.id && like.user_id == userID
    })?.id

    if (!relationId) {
      return res.status(500)
    }

    try {
      await fetch(`http://localhost:5432/likes/${relationId}`, {
        method: 'DELETE',
      })
    } catch {
      return res.status(500)
    }
  },
}
