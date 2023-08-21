/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')
const {
  getDB,
  getUserIdByHeaderJWT,
  checkAuth,
  r500,
  r401,
  r200,
  r404,
  postsUtils,
  usersUtils,
  getUserNameByHeaderJWT,
  throttle,
  checkAdmin,
  r403,
} = require('./utils')

const {
  filterPostsByAuthor,
  filterPostsByTag,
  getCommentsAmount,
  getIsLiked,
  getIsSaved,
  getLikesAmount,
  getUserSavedPosts,
  cascadeDeletingReports,
  cascadeDeletingComments,
  cascadeDeletingLikes,
  cascadeDeletingSaves,
} = postsUtils

const {
  getBlockedTagsNames,
  getUsersSubscriptionsIDs,
  getTagsSubscriptionsNames,
} = usersUtils

module.exports = {
  getPosts: (req, res) => {
    const { posts = [], users = [] } = getDB()

    const userID = getUserIdByHeaderJWT(req)
    const authorNameFromJWT = getUserNameByHeaderJWT(req)
    let result = [...posts]

    const page = +req.query['page'] ? +req.query['page'] - 1 : 0
    const limit = +req.query['limit'] || 0
    const tag = req.query['tag'] || ''
    const authorName = req.query['author'] || ''
    const savedByUser = req.query['saved'] || ''
    const subscriptions = req.query['subscriptions'] || ''

    if (authorName) result = filterPostsByAuthor(authorName, result)
    if (tag) result = filterPostsByTag(tag, result)
    if (userID && savedByUser) result = getUserSavedPosts(userID, result)
    if (userID && !savedByUser && authorNameFromJWT != authorName) {
      const blockedTagsNames = getBlockedTagsNames(userID)

      result = result.filter((post) => {
        const intersections = blockedTagsNames.filter((value) =>
          post.tags.includes(value)
        )

        return !intersections.length
      })
    }

    if (subscriptions && userID) {
      const tagsSubscriptions = getTagsSubscriptionsNames(userID)
      const userSubscriptionsIDs = getUsersSubscriptionsIDs(userID)

      result = result.filter((post) => {
        return Boolean(
          tagsSubscriptions.filter((value) => post.tags.includes(value))
            .length || userSubscriptionsIDs.includes(post.author_id)
        )
      })
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

      let likesAmount = getLikesAmount(id)
      let commentsAmount = getCommentsAmount(id)
      const isSaved = getIsSaved(userID, id)
      const isLiked = getIsLiked(userID, id)

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
    if (!checkAuth(req)) return r401(res)

    const { likes = [] } = getDB()
    const userID = getUserIdByHeaderJWT(req)

    if (
      likes.find((like) => {
        return Boolean(like.post_id == +req.params.id && like.user_id == userID)
      })
    ) {
      return r200(res)
    }

    try {
      await fetch('http://localhost:5432/likes', {
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
    if (!checkAuth(req) && !req.headers['cascade-delete']) return r401(res)

    const { likes = [] } = getDB()

    const userID = getUserIdByHeaderJWT(req)

    const relationId = likes.find((like) => {
      return like.post_id == req.params.id && like.user_id == userID
    })?.id

    if (!relationId) {
      return r200(res)
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
    const { posts = [], users = [] } = getDB()

    try {
      const { author_id, ...post } = posts.find((el) => el.id == req.params.id)
      const userID = getUserIdByHeaderJWT(req)

      if (post) {
        const { login, id, avatar } = users.find((user) => user.id == author_id)

        let likesAmount = getLikesAmount(req.params.id)
        let commentsAmount = getCommentsAmount(req.params.id)
        const isSaved = getIsSaved(userID, req.params.id)
        const isLiked = getIsLiked(userID, req.params.id)

        throttle(() => {
          fetch(`http://localhost:5432/posts/${req.params.id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify({
              ...post,
              author_id,
              views: post.views + 1,
            }),
          })
        }, 100)()

        return r200(res, {
          ...post,
          likesAmount,
          commentsAmount,
          isLiked,
          isSaved,
          views: post.views + 1,
          author: { id, login, avatar },
        })
      } else {
        r404(res)
      }
    } catch (e) {
      return r500(res)
    }
  },

  savePost: async (req, res) => {
    if (!checkAuth(req)) return r401(res)

    const { saves = [] } = getDB()
    const userID = getUserIdByHeaderJWT(req)

    if (
      saves.find((save) => {
        return Boolean(save.post_id == +req.params.id && save.user_id == userID)
      })
    ) {
      return r200(res)
    }

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
    if (!checkAuth(req) && !req.headers['cascade-delete']) return r401(res)

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

  deletePost: async (req, res, next) => {
    if (!checkAuth(req)) return r401(res)

    const { posts = [] } = getDB()
    const userID = getUserIdByHeaderJWT(req)

    const author_id = posts.find((post) => post.id == req.params.id)?.author_id

    if (author_id == userID || checkAdmin(req)) {
      // удалить жалобы
      await cascadeDeletingReports(req.params.id)

      // удалить комментарии
      await cascadeDeletingComments(req.params.id)

      //удалить лайки
      await cascadeDeletingLikes(req.params.id)

      //удалить сохранения
      await cascadeDeletingSaves(req.params.id)

      next()
    } else {
      return r403(res)
    }
  },
}
