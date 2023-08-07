/* eslint-disable @typescript-eslint/no-var-requires */
const { getDB, getUserIdByHeaderJWT, r404, r200, r401 } = require('./utils')

module.exports = {
  getMyPersonalInfo: async (req, res) => {
    const { users = [], usersSubscriptions = [] } = getDB()
    const userID = getUserIdByHeaderJWT(req)

    const userFromDB = users.find((user) => user.id == userID)

    if (userFromDB) {
      const { id, login, headerTheme, ignoreList, systemRole, avatar } =
        userFromDB

      const usersSubscriptionsIDs = usersSubscriptions
        .filter((el) => el.subscribed_by == id)
        .map((el) => el.subscribed_on)

      const usersSubscriptionsNames = users
        .filter((user) => usersSubscriptionsIDs.find((el) => el == user.id))
        .map((user) => user.login)

      const followersAmount = usersSubscriptions.reduce((count, current) => {
        return current.subscribed_on == userID ? count + 1 : count
      }, 0)

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
    const { users = [], usersSubscriptions = [] } = getDB()

    const userFromDB = users.find((user) => {
      return user.login === req.params.name
    })

    if (userFromDB) {
      const { id, systemRole, login, avatar, status, headerTheme } = userFromDB

      const usersSubscriptionsIDs = usersSubscriptions
        .filter((el) => el.subscribed_by == id)
        .map((el) => el.subscribed_on)

      const usersSubscriptionsNames = users
        .filter((user) => usersSubscriptionsIDs.find((el) => el == user.id))
        .map((user) => user.login)

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
}
