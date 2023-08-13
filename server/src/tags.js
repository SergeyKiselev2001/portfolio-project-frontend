/* eslint-disable @typescript-eslint/no-var-requires */
const {
  checkAuth,
  r401,
  r500,
  getDB,
  getUserIdByHeaderJWT,
  r200,
} = require('./utils')
const fetch = require('node-fetch')

module.exports = {
  getTagsInfo: async (req, res, next) => {
    next()
  },

  subscribeOnTag: async (req, res) => {
    if (!checkAuth(req)) return r401(res)

    const { tags = [], tagsBlocks = [] } = getDB()
    const userID = getUserIdByHeaderJWT(req)
    const type = req.body.type

    const tagID = tags.find((tag) => tag.type == type).id

    const deleteBlockID = tagsBlocks.find(
      (block) => block.blocked_by == userID && block.blocked_tag_id == tagID
    )?.id

    try {
      await fetch('http://localhost:5432/tagsSubscriptions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscribed_by: userID,
          subscribed_on: tagID,
        }),
      })

      if (deleteBlockID) {
        await fetch(`http://localhost:5432/tagsBlocks/${deleteBlockID}`, {
          method: 'DELETE',
        })
      }

      return r200(res)
    } catch (e) {
      return r500(res, e.message)
    }
  },

  unsubscribeFromTag: async (req, res) => {
    if (!checkAuth(req)) return r401(res)

    const { tags = [], tagsSubscriptions = [] } = getDB()
    const userID = getUserIdByHeaderJWT(req)
    const type = req.body.type

    const tagID = tags.find((tag) => tag.type == type).id

    const subscribeRelationID = tagsSubscriptions.find(
      (tag) => tag.subscribed_by == userID && tag.subscribed_on == tagID
    )?.id

    try {
      if (subscribeRelationID) {
        await fetch(
          `http://localhost:5432/tagsSubscriptions/${subscribeRelationID}`,
          { method: 'DELETE' }
        )
        return r200(res)
      } else {
        return r500(res, 'relation not found')
      }
    } catch (e) {
      return r500(res, e.message)
    }
  },

  blockTag: async (req, res) => {
    if (!checkAuth(req)) return r401(res)

    const { tags = [], tagsSubscriptions = [] } = getDB()
    const userID = getUserIdByHeaderJWT(req)
    const type = req.body.type

    const tagID = tags.find((tag) => tag.type == type).id

    const deleteTagSubscriptionID = tagsSubscriptions.find(
      (subscription) =>
        subscription.subscribed_by == userID &&
        subscription.subscribed_on == tagID
    )?.id

    try {
      await fetch('http://localhost:5432/tagsBlocks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blocked_by: userID,
          blocked_tag_id: tagID,
        }),
      })

      if (deleteTagSubscriptionID) {
        await fetch(
          `http://localhost:5432/tagsSubscriptions/${deleteTagSubscriptionID}`,
          { method: 'DELETE' }
        )
      }

      return r200(res)
    } catch (e) {
      return r500(res, e.message)
    }
  },

  unblockTag: async (req, res) => {
    if (!checkAuth(req)) return r401(res)

    const { tags = [], tagsBlocks = [] } = getDB()
    const userID = getUserIdByHeaderJWT(req)
    const type = req.body.type

    const tagID = tags.find((tag) => tag.type == type).id

    const blockedTagRelationID = tagsBlocks.find(
      (tag) => tag.blocked_by == userID && tag.blocked_tag_id == tagID
    )?.id

    try {
      if (blockedTagRelationID) {
        await fetch(
          `http://localhost:5432/tagsBlocks/${blockedTagRelationID}`,
          { method: 'DELETE' }
        )
        return r200(res)
      } else {
        return r500(res, 'relation not found')
      }
    } catch (e) {
      return r500(res, e.message)
    }
  },
}
