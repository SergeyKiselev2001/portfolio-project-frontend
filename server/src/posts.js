/* eslint-disable @typescript-eslint/no-var-requires */
const {
  getDB,
  getUserIdByHeaderJWT,
  checkAuth,
  r500,
  r401,
  r200,
  r404,
} = require('./utils')

module.exports = {
  getPosts: (req, res) => {
    const {
      posts = [],
      likes = [],
      saves = [],
      comments = [],
      users = [],
    } = getDB()

    const userID = getUserIdByHeaderJWT(req)
    let result = [...posts]

    const page = +req.query['page'] ? +req.query['page'] - 1 : 0
    const limit = +req.query['limit'] || 0
    const tag = req.query['tag'] || ''
    const authorName = req.query['author']

    if (authorName) {
      result = result.filter(
        (el) =>
          el.author_id == users.find((user) => user.login == authorName).id
      )
    }

    if (tag) {
      result = result.filter((el) => el.tags.find((postTag) => postTag == tag))
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
            .filter((save) => save.post_id == id)
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
          login,
          avatar,
          id: author.id,
        },
      }
    })

    return r200(res, result)
  },

  likePost: async (req, res) => {
    console.log('DAAAA LIKE')
    if (!checkAuth(req)) return r401(res)

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

      return r200(res)
    } catch (e) {
      return r500(res, 'fetch error')
    }
  },

  dislikePost: async (req, res) => {
    console.log('DAAAA')
    if (!checkAuth(req)) return r401(res)

    const { likes = [] } = getDB()

    const userID = getUserIdByHeaderJWT(req)

    const relationId = likes.find((like) => {
      return like.post_id == req.params.id && like.user_id == userID
    })?.id

    if (!relationId) {
      return r500(res, 'relation not found')
    }

    try {
      await fetch(`http://localhost:5432/likes/${relationId}`, {
        method: 'DELETE',
      })
      return r200(res)
    } catch {
      return r500(res, 'delete fetch error')
    }
  },

  createPost: async (req, res) => {
    if (!checkAuth(req)) return r401(res)

    const userID = getUserIdByHeaderJWT(req)

    const post = {
      ...req.body,
      author_id: userID,
      timestamp: +Date.now(),
      views: 0,
    }

    try {
      const response = await fetch('http://localhost:5432/posts', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(post),
      })

      const { id } = await response.json()

      return r200(res, { id })
    } catch {
      return r500(res, 'post create fetch error')
    }
  },

  getPostById: async (req, res) => {
    const {
      posts = [],
      users = [],
      likes = [],
      comments = [],
      saves = [],
    } = getDB()

    const { author_id, ...post } = posts.find((el) => el.id == req.params.id)
    const userID = getUserIdByHeaderJWT(req)

    if (post) {
      const { login, id, avatar } = users.find((user) => user.id == author_id)

      let likesAmount = 0
      likes.forEach((like) => {
        if (like.post_id == req.params.id) {
          likesAmount = likesAmount + 1
        }
      })

      let commentsAmount = 0
      comments.forEach((comment) => {
        if (comment.post_id == req.params.id) {
          commentsAmount = commentsAmount + 1
        }
      })

      const isSaved = Boolean(
        userID &&
          saves
            .filter((save) => save.post_id == req.params.id)
            .find((el) => el.user_id == userID)
      )

      const isLiked = Boolean(
        userID &&
          likes
            .filter((like) => like.post_id == req.params.id)
            .find((el) => el.user_id == userID)
      )

      return r200(res, {
        ...post,
        likesAmount,
        commentsAmount,
        isLiked,
        isSaved,
        author: { id, login, avatar },
      })
    } else {
      r404(res)
    }
  },

  savePost: async (req, res) => {
    if (!checkAuth(req)) return r401(res)

    const userID = getUserIdByHeaderJWT(req)

    try {
      await fetch('http://localhost:5432/saves/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: +req.params.id,
          user_id: +userID,
        }),
      })

      return r200(res)
    } catch (e) {
      return r500(res, 'fetch error')
    }
  },

  unsavePost: async (req, res) => {
    console.log('DAAAA 222')
    if (!checkAuth(req)) return r401(res)

    const { saves = [] } = getDB()
    const userID = getUserIdByHeaderJWT(req)

    const relationId = saves.find((save) => {
      return save.post_id == req.params.id && save.user_id == userID
    })?.id

    if (!relationId) {
      return r500(res, 'relation not found')
    }

    try {
      await fetch(`http://localhost:5432/saves/${relationId}`, {
        method: 'DELETE',
      })
      return r200(res)
    } catch {
      return r500(res, 'delete fetch error')
    }
  },
}
