/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const { jwtPairs } = require('./jwtPairs')

module.exports = {
  checkAuth: (req) => {
    const token = module.exports.clearToken(req)
    console.log(req.headers.authorization, 'TIT')

    console.log('TRACK CHECK AUTH', token.slice(0, 10))

    const result = jwtPairs.find(
      (el) => el.tokens.token.slice(0, 10) == token.slice(0, 10)
    )

    console.log('TRACK CHECK AUTH 2', result?.id)
    console.log(jwtPairs.map((el) => el.tokens.token.slice(0, 10)))

    if (!result) {
      return false
    } else return true
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
    const result = jwtPairs.find(
      (el) => el.tokens.token.slice(0, 10) == token.slice(0, 10)
    )

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
}
