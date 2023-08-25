/* eslint-disable @typescript-eslint/no-var-requires */
const jwtPairs = require('./jwtPairs')
const { r403, r500, getDB } = require('./utils')

module.exports = {
  login: (req, res) => {
    try {
      const { login, password } = req.body
      const { users = [] } = getDB()
      const userFromDB = users.find(
        (user) => user.login === login && user.password === password
      )

      const { systemRole, avatar, newNotifications, headerTheme } = userFromDB

      const tokens = jwtPairs.jwtPairs.find(({ user }) => user == login).tokens

      if (userFromDB) {
        return res.json({
          ...tokens,
          userInfo: {
            systemRole,
            headerTheme,
            avatar,
            newNotifications,
          },
        })
      }

      return r403(res, { message: 'User not found' })
    } catch (e) {
      return r500(res, { message: e.message })
    }
  },
}
