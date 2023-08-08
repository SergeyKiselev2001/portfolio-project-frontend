/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-var-requires */
const jsonServer = require('json-server')
const { jwtPairs } = require('./src/jwtPairs')
const { getDB } = require('./src/utils')
const Comments = require('./src/comments')
const Posts = require('./src/posts')
const Users = require('./src/users')

const path = require('path')

const server = jsonServer.create()
const router = jsonServer.router(path.resolve(__dirname, 'db.json'))

server.use(jsonServer.defaults({}))
server.use(jsonServer.bodyParser)

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 500)
  })
  next()
})

server.get('/users/me', Users.getMyPersonalInfo)
server.get('/users/:name', Users.getUserInfoByName)
//server.post('/comments', Comments.createComment)
server.get('/posts', Posts.getPosts)
server.get('/posts/:id', Posts.getPostById)
server.post('/posts/create', Posts.createPost)
server.post('/posts/:id/like', Posts.likePost)
server.post('/posts/:id/save', Posts.savePost)
server.delete('/posts/:id/dislike', Posts.dislikePost)
server.delete('/posts/:id/unsave', Posts.unsavePost)

// // PROFILE SUBSCRIPTION
// server.post('/users/:id', function (req, res, next) {
//   //
// })

// // PROFILE UNSUBSCRIPTION
// server.post('/users/:id', function (req, res, next) {
//   //
// })

// // UPDATE STATUS
// server.post('/users/:id', function (req, res, next) {
//   //
// })

// // UPDATE HEADER THEME
// server.post('/users/:id', function (req, res, next) {
//   //
// })

// // TODO
// // DELETE POST AND COMMENTS
// server.delete('/posts/:postId', function (req, res, next) {
//   //
// })

// // TAGS
// server.post('/users/:id', function (req, res, next) {
//   //
// })

// server.post('/user/:name/subscribe', (req, res) => {
//   //
// })

// Эндпоинт для логина
server.post('/login', (req, res) => {
  try {
    const { login, password } = req.body
    const { users = [] } = getDB()
    const userFromDB = users.find(
      (user) => user.login === login && user.password === password
    )

    const { systemRole, avatar, newNotifications, headerTheme } = userFromDB

    if (userFromDB) {
      return res.json({
        ...jwtPairs.find(({ user }) => user == login).tokens,
        userInfo: {
          systemRole,
          headerTheme,
          avatar,
          newNotifications,
        },
      })
    }

    return res.status(403).json({ message: 'User not found' })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: e.message })
  }
})

// Эндпоинт для логина
server.post('/report', (req, res) => {
  try {
    const { postId } = req.body

    return res.json({
      message: `Пост с id=${postId} отправлен на модерацию`,
    })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

server.use(router)

// запуск сервера
server.listen(5432, () => {
  console.log('server is running on 5432 port')
})
