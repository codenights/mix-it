import express from 'express'
import * as socketio from 'socket.io'
import compression from 'compression'  // compresses requests
import cors from 'cors'
import session from 'express-session'
import bodyParser from 'body-parser'
import lusca from 'lusca'
import mongo from 'connect-mongo'
import flash from 'express-flash'
import path from 'path'
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import { MONGODB_URI, SESSION_SECRET } from './util/secrets'

const MongoStore = mongo(session)

// Controllers (route handlers)
import * as hostController from './controllers/host'

// Create Express server
const app = express()
const server = app.listen(3000, () => {
  console.log('server running')
})

// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require('socket.io')(server, { origins: '*:*' })

// Connect to MongoDB
const mongoUrl = MONGODB_URI
mongoose.Promise = bluebird

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
  console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err)
  // process.exit();
})

// Express configuration
app.use(cors({ origin: true }))
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: new MongoStore({
    url: mongoUrl,
    autoReconnect: true
  })
}))
app.use(flash())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))

/**
 * Primary app routes.
 */
app.get('/host', hostController.index)

const global = io.on('connection', function(socket: any) {
  console.log('a user connected')
  socket.emit('request', { hello: 'world' }) // emit an event to the socket
  socket.on('pingServer', (data: string) => {
    console.log('Client sent : ', data)
    setTimeout(() => socket.emit('pongClient', 'PONG'), 2000)
  })
})
io.of('/host').on('connection', (socketHost: any) => {
  console.log('Host connected')
  socketHost.on('addHost', (partyId: string) => {
    const room = hostController.partyList.get(partyId)
    room.host = socketHost
  })
})

interface RoomRequest {
  songId: string;
  partyId: string;
}
io.of('/room').on('connection', (socketRoom: any) => {
  console.log('Room connected')
  socketRoom.on('addSong', ({ songId, partyId }: RoomRequest) => {
    console.log(songId, partyId)
    const room = hostController.partyList.get(partyId)
    if(!room) {
      console.log('La party n\'existe pas')
    } else {
      console.log(room)
      const existingSong = room.party.playlist.find(song => song === songId)
      if (!existingSong) room.party.playlist.push(songId)
      room.host.emit(partyId, room.party)
    }
  })
})

// ============================
// app.get('/login', userController.getLogin)
// app.post('/login', userController.postLogin)
// app.get('/logout', userController.logout)
// app.get('/forgot', userController.getForgot)
// app.post('/forgot', userController.postForgot)
// app.get('/reset/:token', userController.getReset)
// app.post('/reset/:token', userController.postReset)
// app.get('/signup', userController.getSignup)
// app.post('/signup', userController.postSignup)
// app.get('/contact', contactController.getContact)
// app.post('/contact', contactController.postContact)
// app.get('/account', passportConfig.isAuthenticated, userController.getAccount)
// app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile)
// app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword)
// app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount)
// app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink)

/**
 * API examples routes.
 */
// app.get('/api', apiController.getApi)
// app.get('/api/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook)
//
// /**
//  * OAuth authentication routes. (Sign in)
//  */
// app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }))
// app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
//     res.redirect(req.session.returnTo || '/')
// })

export default app
