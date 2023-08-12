/* eslint-disable @typescript-eslint/no-var-requires */
const {
  getDB,
  getUserIdByHeaderJWT,
  r404,
  r200,
  r401,
  usersUtils,
  checkAuth,
  r500,
} = require('./utils')

const {
  getUsersSubscriptionsIDs,
  getUsersSubscriptionsNames,
  getFollowersAmount,
} = usersUtils

module.exports = {
  getMyPersonalInfo: async (req, res) => {
    if (!checkAuth(req)) return r401(res)

    const { users = [], tagsSubscriptions = [] } = getDB()
    const userID = getUserIdByHeaderJWT(req)

    const userFromDB = users.find((user) => user.id == userID)

    if (userFromDB) {
      const { id, login, headerTheme, ignoreList, systemRole, avatar } =
        userFromDB

      const usersSubscriptionsIDs = getUsersSubscriptionsIDs(id)

      const usersSubscriptionsNames = getUsersSubscriptionsNames(
        usersSubscriptionsIDs
      )

      const tagsSubscriptionsNames = () => {
        ///
      }

      const followersAmount = getFollowersAmount(userID)

      return r200(res, {
        id,
        login,
        headerTheme,
        ignoreList,
        systemRole,
        avatar,
        followersAmount,
        subscriptions: {
          users: [...usersSubscriptionsNames],
          tags: [],
        },
      })
    } else {
      return r401(res)
    }
  },

  getUserInfoByName: (req, res) => {
    const { users = [] } = getDB()

    const userFromDB = users.find((user) => {
      return user.login === req.params.name
    })

    if (userFromDB) {
      const { id, systemRole, login, avatar, status, headerTheme } = userFromDB

      const usersSubscriptionsIDs = getUsersSubscriptionsIDs(id)

      const usersSubscriptionsNames = getUsersSubscriptionsNames(
        usersSubscriptionsIDs
      )

      return r200(res, {
        login,
        headerTheme,
        systemRole,
        avatar,
        status,
        subscriptions: {
          users: [...usersSubscriptionsNames],
          tags: [],
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
}
