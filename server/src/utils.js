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
}
