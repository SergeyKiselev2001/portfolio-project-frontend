/* eslint-disable @typescript-eslint/no-var-requires */
const { checkAuth, clearToken, getDB } = require('./utils')
const { jwtPairs } = require('./jwtPairs')

module.exports = {
  userInfo_GET: (req, res) => {
    checkAuth(req, res)
    const token = clearToken(req)

    const userName = jwtPairs.find(({ tokens }) => tokens.token == token).user

    if (userName) {
      const { users = [] } = getDB()

      const userFromBd = users.find((user) => user.login === userName)
      const { password, ...rest } = userFromBd
      return res.json({ ...rest })
    } else {
      return res.status(401).json({ message: 'INVALID JWT' })
    }
  },
}
