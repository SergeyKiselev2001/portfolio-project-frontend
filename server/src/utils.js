/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const { jwtPairs } = require('./jwtPairs')

module.exports = {
  checkAuth: (req) => {
    const token = module.exports.clearToken(req)
    const result = jwtPairs.find((el) => el.tokens.token == token)

    return Boolean(result)
  },

  clearToken: (req) => {
    const token = `${req.headers.authorization}`
    return token.replace('Bearer ', '') || ''
  },

  getDB: () => {
    const newPath = path.join(__dirname, '/../', 'db.json')
    const db = JSON.parse(fs.readFileSync(newPath, 'UTF-8'))
    return db
  },

  getUserNameByHeaderJWT: (req) => {
    const token = module.exports.clearToken(req)
    return jwtPairs.find((el) => el.tokens.token == token)?.user || false
  },

  getUserIdByHeaderJWT: (req) => {
    const token = module.exports.clearToken(req)
    const result = jwtPairs.find((el) => el.tokens.token == token)

    return result?.id
  },

  throttle: (callback, timeout) => {
    let timer = null
    return function perform(...args) {
      if (timer) return

      timer = setTimeout(() => {
        callback(...args)
        clearTimeout(timer)
        timer = null
      }, timeout)
    }
  },

  r401: (res) => {
    return res.status(401).json({ message: 'Unauthorized Error' })
  },
  r404: (res, message) => {
    return res.status(401).json({ message: message || 'Not found' })
  },
  r500: (res, message) => {
    return res.status(500).json({ message: message || 'Server error' })
  },
  r200: (res, result) => {
    return res
      .status(200)
      .setHeader('Access-Control-Expose-Headers', '*')
      .json(result || { message: 'Ok' })
  },

  usersUtils: {
    getUsersSubscriptionsIDs: (id) => {
      const { usersSubscriptions = [] } = module.exports.getDB()

      return usersSubscriptions
        .filter((el) => el.subscribed_by == id)
        .map((el) => el.subscribed_on)
    },

    getUsersSubscriptionsNames: (usersSubscriptionsIDs) => {
      const { users = [] } = module.exports.getDB()

      return users
        .filter((user) => usersSubscriptionsIDs.find((el) => el == user.id))
        .map((user) => user.login)
    },

    getFollowersAmount: (userID) => {
      const { usersSubscriptions = [] } = module.exports.getDB()

      return usersSubscriptions.reduce((count, current) => {
        return current.subscribed_on == userID ? count + 1 : count
      }, 0)
    }
  },

  commentsUtils: {
    filterCommentsByPostID: (postID, comments) => {
      return comments.filter((comment) => comment.post_id == postID)
    },
  },

  postsUtils: {
    filterPostsByAuthor: (name, posts) => {
      const { users = [] } = module.exports.getDB()

      return posts.filter(
        (post) => post.author_id == users.find((user) => user.login == name).id
      )
    },

    filterPostsByTag: (tag, posts) => {
      return posts.filter((post) => post.tags.find((postTag) => postTag == tag))
    },

    getUserSavedPosts: (userID, posts) => {
      const { saves = [] } = module.exports.getDB()

      const userSaves = saves
        .filter((save) => save.user_id == userID)
        .map((save) => save.post_id)

      const filterBySaved = (post) => {
        if (userSaves.find((save) => save == post.id)) {
          return true
        } else {
          return false
        }
      }

      return posts.filter(filterBySaved)
    },

    getLikesAmount: (postId) => {
      const { likes = [] } = module.exports.getDB()

      let likesAmount = 0
      likes.forEach((like) => {
        if (like.post_id == postId) {
          likesAmount = likesAmount + 1
        }
      })

      return likesAmount
    },

    getCommentsAmount: (postId) => {
      const { comments = [] } = module.exports.getDB()

      let commentsAmount = 0
      comments.forEach((comment) => {
        if (comment.post_id == postId) {
          commentsAmount = commentsAmount + 1
        }
      })

      return commentsAmount
    },

    getIsSaved: (userID, postId) => {
      const { saves = [] } = module.exports.getDB()

      return Boolean(
        userID &&
          saves
            .filter((save) => save.post_id == postId)
            .find((el) => el.user_id == userID)
      )
    },

    getIsLiked: (userID, postId) => {
      const { likes = [] } = module.exports.getDB()

      return Boolean(
        userID &&
          likes
            .filter((like) => like.post_id == postId)
            .find((el) => el.user_id == userID)
      )
    },
  },
}
