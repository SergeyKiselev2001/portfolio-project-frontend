/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const jsonServer = require('json-server')
const { jwtPairs } = require('./src/jwtPairs')
const {
  checkAuth,
  clearToken,
  getDB,
  getUserNameByHeaderJWT,
} = require('./src/utils')
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
    setTimeout(res, 1000)
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
server.delete('/posts/:id/dislike', Posts.dislikePost)

// PROFILE SUBSCRIPTION
server.post('/users/:id', function (req, res, next) {
  checkAuth(req, res)
  if (!req.body['subscribeOnUser']) {
    next()
    return
  }

  const { users = [] } = getDB()

  const userFromDB = users.find((user) => user.id == req.params.id)

  req.body = {
    ...userFromDB,
    subscriptions: {
      ...userFromDB.subscriptions,
      users: [...userFromDB.subscriptions.users, req.body.subscribeOnUser],
    },
  }

  req.method = 'PUT'
  next()
})

// PROFILE UNSUBSCRIPTION
server.post('/users/:id', function (req, res, next) {
  checkAuth(req, res)
  if (!req.body['unsubscribeFromUser']) {
    next()
    return
  }

  const { users = [] } = getDB()

  const userFromDB = users.find((user) => user.id == req.params.id)

  req.body = {
    ...userFromDB,
    subscriptions: {
      ...userFromDB.subscriptions,
      users: userFromDB.subscriptions.users.filter(
        (user) => user != req.body.unsubscribeFromUser
      ),
    },
  }

  req.method = 'PUT'
  next()
})

// UPDATE STATUS
server.post('/users/:id', function (req, res, next) {
  checkAuth(req, res)
  if (!req.body['newStatus']) {
    next()
    return
  }

  const { users = [] } = getDB()
  const userFromDB = users.find((user) => user.id == req.params.id)

  if (!userFromDB) {
    next()
    return
  }

  req.method = 'PUT'

  req.body = {
    ...userFromDB,
    status: req.body.newStatus,
  }

  next()
})

// UPDATE HEADER THEME
server.post('/users/:id', function (req, res, next) {
  checkAuth(req, res)
  if (!req.body['headerTheme']) {
    next()
    return
  }

  const { users = [] } = getDB()
  const userFromDB = users.find((user) => user.id == req.params.id)

  if (!userFromDB) {
    next()
    return
  }

  req.method = 'PUT'

  req.body = {
    ...userFromDB,
    headerTheme: req.body.headerTheme,
  }

  next()
})

// TODO
// DELETE POST AND COMMENTS
server.delete('/posts/:postId', function (req, res, next) {
  checkAuth(req, res)
  // if (!req.body['deleteCommentsByPostID']) {
  //   next()
  //   return
  // }

  const { comments = [] } = getDB()

  const commentsToDelete = comments
    .filter((comment) => comment.post_id == req.params.postId)
    .map((comment) => comment.id)

  console.log(commentsToDelete, 'HERE')

  commentsToDelete.forEach((id) => {
    fetch('http://localhost:5432/comments/' + id, {
      method: 'DELETE',
    })
  })

  //   fetch('https://example.com/delete-item/' + id, {
  //   method: 'DELETE',
  // })

  //req.body = newComments

  next()
})

// TAGS
server.post('/users/:id', function (req, res, next) {
  checkAuth(req, res)
  if (!req.body.tagBlocks && !req.body.tagSubscription) {
    next()
    return
  }

  const { users = [] } = getDB()

  const userFromDB = users.find(
    (user) => user.login == getUserNameByHeaderJWT(req)
  )

  if (!userFromDB) {
    next()
    return
  }

  if (req.body.tagSubscription) {
    req.method = 'PUT'
    if (req.body.tagSubscription.newValue) {
      const newSubs = [
        ...userFromDB.subscriptions.tags,
        req.body.tagSubscription.type,
      ]
      const uniqSubs = [...new Set(newSubs)]
      const newBody = {
        ...userFromDB,
        subscriptions: {
          ...userFromDB.subscriptions,
          tags: uniqSubs,
        },
      }

      req.body = newBody
    } else {
      const newSubs = [
        ...userFromDB.subscriptions.tags.filter(
          (tag) => tag != req.body.tagSubscription.type
        ),
      ]

      const newBody = {
        ...userFromDB,
        subscriptions: {
          ...userFromDB.subscriptions,
          tags: newSubs,
        },
      }

      req.body = newBody
    }
  }

  if (req.body.tagBlocks) {
    req.method = 'PUT'
    if (req.body.tagBlocks.newValue) {
      const newTags = [...userFromDB.ignoreList.tags, req.body.tagBlocks.type]
      const uniqTags = [...new Set(newTags)]

      const newBody = {
        ...userFromDB,

        ignoreList: {
          ...userFromDB.ignoreList,
          tags: uniqTags,
        },
      }

      req.body = newBody
    } else {
      const newTags = [
        ...userFromDB.ignoreList.tags.filter(
          (tag) => tag != req.body.tagBlocks.type
        ),
      ]

      const newBody = {
        ...userFromDB,
        ignoreList: {
          ...userFromDB.ignoreList,
          tags: newTags,
        },
      }

      req.body = newBody
    }
  }
  next()
})

// SAVE POST
server.post('/users/:id', function (req, res, next) {
  checkAuth(req, res)
  if (!req.body.savePost) {
    next()
    return
  }

  const { users = [] } = getDB()

  const userFromDB = users.find(
    (user) => user.login == getUserNameByHeaderJWT(req)
  )

  if (!userFromDB) {
    next()
    return
  }

  req.method = 'PUT'

  const newSaved = [...userFromDB.savedPosts, req.body.savePost]
  const uniqSaved = [...new Set(newSaved)]

  const newBody = {
    ...userFromDB,
    savedPosts: uniqSaved,
  }

  req.body = newBody
  next()
})

// UNSAVE POST
server.post('/users/:id', function (req, res, next) {
  checkAuth(req, res)
  if (!req.body.removeFromSaved) {
    next()
    return
  }

  const { users = [] } = getDB()

  const userFromDB = users.find(
    (user) => user.login == getUserNameByHeaderJWT(req)
  )

  if (!userFromDB) {
    next()
    return
  }

  req.method = 'PUT'

  const newSaved = userFromDB.savedPosts.filter(
    (el) => el != req.body.removeFromSaved
  )

  const newBody = {
    ...userFromDB,
    savedPosts: newSaved,
  }

  req.body = newBody
  next()
})

server.post('/user/:name/subscribe', (req, res, next) => {
  try {
    const { users = [] } = getDB()
    const { name } = req.params

    checkAuth(req, res)
    const token = clearToken(req)

    const userName = jwtPairs.find(({ tokens }) => tokens.token == token).user

    const userFromDB = users.find((user) => user.login === userName)

    if (userFromDB) {
      const newData = {
        ...getDB(),
      }

      newData.users
        .find((el) => el.login == userName)
        .subscriptions.users.push(name)

      fs.writeFileSync(
        path.resolve(__dirname, 'db.json'),
        JSON.stringify(newData)
      )

      return res.status(200)
    } else {
      return res.status(403).json({ message: 'User not found' })
    }
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

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
