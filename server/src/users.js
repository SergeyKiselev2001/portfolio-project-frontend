/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')
const {
  getDB,
  getUserIdByHeaderJWT,
  r404,
  r200,
  r401,
  usersUtils,
  checkAuth,
  checkAdmin,
  r500,
  r403,
} = require('./utils')

const {
  getUsersSubscriptionsIDs,
  getUsersSubscriptionsNames,
  getFollowersAmount,
  getTagsSubscriptionsNames,
  getBlockedTagsNames,
  getUsersSubscribersNames,
} = usersUtils

module.exports = {
  getAllUsers: async (req, res) => {
    if (!checkAdmin(req)) return r403(res)
    const { users = [] } = getDB()

    const result = users.map(({ id, login, systemRole, avatar }) => ({
      id,
      login,
      systemRole,
      avatar,
    }))

    return r200(res, result)
  },

  getMyPersonalInfo: async (req, res) => {
    if (!checkAuth(req)) return r401(res)

    const { users = [] } = getDB()
    const userID = getUserIdByHeaderJWT(req)

    const userFromDB = users.find((user) => user.id == userID)

    if (userFromDB) {
      const { id, login, headerTheme, systemRole, avatar } = userFromDB

      const usersSubscriptionsIDs = getUsersSubscriptionsIDs(id)

      const usersSubscriptionsNames = getUsersSubscriptionsNames(
        usersSubscriptionsIDs
      )

      const tagsSubscriptionsNames = getTagsSubscriptionsNames(userID)

      const blockedTagsNames = getBlockedTagsNames(userID)

      const usersSubscribersNames = getUsersSubscribersNames(id)

      const followersAmount = getFollowersAmount(userID)

      return r200(res, {
        id,
        login,
        headerTheme,
        systemRole,
        avatar,
        followersAmount,
        ignoreList: {
          tags: [...blockedTagsNames],
        },
        subscribers: [...usersSubscribersNames],
        subscriptions: {
          users: [...usersSubscriptionsNames],
          tags: [...tagsSubscriptionsNames],
        },
      })
    } else {
      return r401(res)
    }
  },

  getUserInfoByName: (req, res) => {
    const { users = [] } = getDB()

    const userFromDB = users.find((user) => {
      return user.login === req.params.login
    })

    if (userFromDB) {
      const { id, systemRole, login, avatar, status, headerTheme } = userFromDB

      const usersSubscriptionsIDs = getUsersSubscriptionsIDs(id)

      const usersSubscriptionsNames = getUsersSubscriptionsNames(
        usersSubscriptionsIDs
      )

      const usersSubscribersNames = getUsersSubscribersNames(id)

      const tagsSubscriptionsNames = getTagsSubscriptionsNames(id)

      return r200(res, {
        login,
        headerTheme,
        systemRole,
        avatar,
        status,
        subscribers: [...usersSubscribersNames],
        subscriptions: {
          users: [...usersSubscriptionsNames],
          tags: [...tagsSubscriptionsNames],
        },
      })
    } else {
      return r404(res, 'User not found')
    }
  },

  subscribeOnUser: async (req, res) => {
    if (!checkAuth(req)) return r401(res)

    const { users = [] } = getDB()

    const userID = getUserIdByHeaderJWT(req)
    const subscribeOnID = users.find(
      (user) => user.login == req.params.login
    ).id

    try {
      await fetch(`http://localhost:5432/usersSubscriptions`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          subscribed_by: userID,
          subscribed_on: subscribeOnID,
        }),
      })
      return r200(res)
    } catch {
      return r500(res, 'delete fetch error')
    }
  },

  unsubscribeFromUser: async (req, res) => {
    if (!checkAuth(req)) return r401(res)

    const { usersSubscriptions = [], users = [] } = getDB()

    const userID = getUserIdByHeaderJWT(req)

    const unsubscribeFromID = users.find(
      (user) => user.login == req.params.login
    ).id

    const relationID = usersSubscriptions.find(
      (el) =>
        el.subscribed_on == unsubscribeFromID && el.subscribed_by == userID
    ).id

    try {
      await fetch(`http://localhost:5432/usersSubscriptions/${relationID}`, {
        method: 'DELETE',
      })
      return r200(res)
    } catch {
      return r500(res, 'delete fetch error')
    }
  },

  setStatus: async (req, res) => {
    if (!checkAuth(req)) return r401(res)

    const { users = [] } = getDB()

    const userID = getUserIdByHeaderJWT(req)

    const newStatus = req.body['newStatus']

    const user = users.find((el) => el.id == userID)

    if (!user) {
      return r404(res, 'Пользователь не найден!')
    }

    try {
      await fetch(`http://localhost:5432/users/${userID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...user,
          status: newStatus,
        }),
      })
      return r200(res)
    } catch {
      return r500(res, 'update status error')
    }
  },

  setHeaderTheme: async (req, res) => {
    if (!checkAuth(req)) return r401(res)

    const { users = [] } = getDB()

    const userID = getUserIdByHeaderJWT(req)

    const newTheme = req.body['newTheme']

    const user = users.find((el) => el.id == userID)

    if (!user) {
      return r404(res, 'Пользователь не найден!')
    }

    try {
      await fetch(`http://localhost:5432/users/${userID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...user,
          headerTheme: newTheme,
        }),
      })
      return r200(res)
    } catch {
      return r500(res, 'update theme error')
    }
  },
}
