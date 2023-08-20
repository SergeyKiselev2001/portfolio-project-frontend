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

  checkAdmin: (req) => {
    const token = module.exports.clearToken(req)
    const result =
      jwtPairs.find((el) => el.tokens.token == token)?.user == 'Admin'

    return Boolean(result)
  },

  clearToken: (req) => {
    console.log('START 2')
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
  r403: (res) => {
    return res.status(403).json({ message: 'Forbidden' })
  },
  r404: (res, message) => {
    return res.status(401).json({ message: message || 'Not found' })
  },
  r422: (res, message) => {
    return res.status(422).json({ message: message || 'Logical error' })
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
    getBlockedTagsNames: (userID) => {
      const { tagsBlocks = [], tags = [] } = module.exports.getDB()

      const tagsIDs = tagsBlocks
        .filter((block) => block.blocked_by == userID)
        .map((block) => block.blocked_tag_id)

      const tagsNames = tagsIDs.map((tagID) => {
        return tags.find((el) => el.id == tagID).type
      })

      return tagsNames
    },

    getTagsSubscriptionsNames: (userID) => {
      const { tagsSubscriptions = [], tags = [] } = module.exports.getDB()

      const tagsIDs = tagsSubscriptions
        .filter((subscription) => subscription.subscribed_by == userID)
        .map((subscription) => subscription.subscribed_on)

      const tagsNames = tagsIDs.map((tagID) => {
        return tags.find((el) => el.id == tagID).type
      })

      return tagsNames
    },

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
    },
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

    cascadeDeletingReports: async (post_id) => {
      // удалить жалобы
      const { reports = [] } = module.exports.getDB()

      const target_reports_ids = reports
        ?.filter((report) => report.post_id == post_id)
        ?.map((el) => el.id)

      for (let relation_id of target_reports_ids) {
        await fetch(`http://localhost:5432/reports/${relation_id}`, {
          method: 'DELETE',
          headers: {
            'cascade-delete': '*',
          },
        })
      }
    },

    cascadeDeletingComments: async (post_id) => {
      // удалить комментарии
      const { comments = [] } = module.exports.getDB()

      const target_comments_ids = comments
        ?.filter((comment) => comment.post_id == post_id)
        ?.map((el) => el.id)

      for (let relation_id of target_comments_ids) {
        await fetch(`http://localhost:5432/comments/${relation_id}`, {
          method: 'DELETE',
          headers: {
            'cascade-delete': '*',
          },
        })
      }
    },

    cascadeDeletingLikes: async (post_id) => {
      const { likes = [] } = module.exports.getDB()

      const target_likes_ids = likes
        ?.filter((like) => like.post_id == post_id)
        ?.map((el) => el.id)

      for (let relation_id of target_likes_ids) {
        await fetch(`http://localhost:5432/likes/${relation_id}`, {
          method: 'DELETE',
          headers: {
            'cascade-delete': '*',
          },
        })
      }
    },

    cascadeDeletingSaves: async (post_id) => {
      const { saves = [] } = module.exports.getDB()

      const target_saves_ids = saves
        ?.filter((save) => save.post_id == post_id)
        ?.map((el) => el.id)

      for (let relation_id of target_saves_ids) {
        await fetch(`http://localhost:5432/saves/${relation_id}`, {
          method: 'DELETE',
          headers: {
            'cascade-delete': '*',
          },
        })
      }
    },
  },
}
