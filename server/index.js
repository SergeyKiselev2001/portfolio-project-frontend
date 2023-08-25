/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-var-requires */
const jsonServer = require('json-server')
const Comments = require('./src/comments')
const Posts = require('./src/posts')
const Users = require('./src/users')
const Tags = require('./src/tags')

const path = require('path')
const Reports = require('./src/reports')
const Saves = require('./src/saves')
const Likes = require('./src/likes')
const Login = require('./src/login')

const server = jsonServer.create()
const router = jsonServer.router(path.resolve(__dirname, 'db.json'))

server.use(jsonServer.defaults({}))
server.use(jsonServer.bodyParser)

server.get('/users/me', Users.getMyPersonalInfo)
server.get('/users/all', Users.getAllUsers)
server.get('/users/:login', Users.getUserInfoByName)
server.get('/users/:login/unsubscribe', Users.unsubscribeFromUser)
server.get('/users/:login/subscribe', Users.subscribeOnUser)
server.post('/users/:login/setStatus', Users.setStatus)
server.post('/users/:login/setTheme', Users.setHeaderTheme)

server.get('/comments', Comments.getComments)
server.post('/comments/create', Comments.createComment)
server.delete('/comments/:id', Comments.deleteComment)

server.get('/tags', Tags.getTagsInfo)
server.post('/tags/subscribe', Tags.subscribeOnTag)
server.post('/tags/unsubscribe', Tags.unsubscribeFromTag)
server.post('/tags/block', Tags.blockTag)
server.post('/tags/unblock', Tags.unblockTag)

server.post('/reports', Reports.sendReport)
server.get('/reports/all', Reports.getAllReports)
server.delete('/reports/:report_id', Reports.deleteReport)

server.get('/posts', Posts.getPosts)
server.get('/posts/:id', Posts.getPostById)
server.post('/posts/create', Posts.createPost)
server.post('/posts/:id/like', Posts.likePost)
server.post('/posts/:id/save', Posts.savePost)
server.delete('/posts/:id', Posts.deletePost)
server.delete('/posts/:id/dislike', Posts.dislikePost)
server.delete('/posts/:id/unsave', Posts.unsavePost)

server.delete('/saves/:id', Saves.deleteSave)
server.delete('/likes/:id', Likes.deleteLike)

server.post('/login', Login.login)

server.use(router)

// запуск сервера
server.listen(5432, () => {
  console.log('server is running on 5432 port')
})
