import express from 'express'
import expressGraphQL from 'express-graphql'
import schema from './data/schema'
import jwt from 'express-jwt'
import cors from 'cors'
import db from './data/db'
import http from 'http';
import SocketIO from 'socket.io'
import uuid from 'uuid'

import winChecker from './tictactoe/winChecker'
import ai from './tictactoe/ai'

const app = express()


app.set('port', (process.env.PORT || 3001));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
})



// PRODUCTION
const secret = process.env.AUTH_SECRET

//DEVELOPMENT
// import authSecret from '../authSecret'
// const secret = authSecret


var jwtCheck = jwt({
  secret: new Buffer(secret, 'base64'),
  audience: 'ygUSzo55mYxKoOuUAQAsxAwKqkuG0YvM',
  credentialsRequired: false,
});



import PermissionsHandler from './data/mutations/PermissionsHandler'

function permissionsMiddleware(req, res, next){
  if (!req.user) {
    req.permissions = [1]
    next()
  } else {
    const requesterId = req.user.sub
    PermissionsHandler(requesterId).then( (person) => {
      req.permissions = person.permissions
      next()
    })
  }
}

const corsOptions = {
  origin: true,
  credentials: true
}

app.use('/graphql', [cors(corsOptions), jwtCheck, permissionsMiddleware], expressGraphQL((req) => {
  return {
    schema,
    graphiql: true,
    context: {
      permissions: req.permissions
    },
    pretty: true
  }
}));



db
  .sync()
  .then(function(err) {
    console.log('It worked!')
  }, function (err) {
    console.log('An error occurred while creating the table:', err)
  })


const server = app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
})

const io = new SocketIO(server)
io.set('origins', '*:*')

let waitingRooms = []
let liveMatches = []

const INITIAL_BOARDSTATE = {
  0: 'EMPTY',
  1: 'EMPTY',
  2: 'EMPTY',
  3: 'EMPTY',
  4: 'EMPTY',
  5: 'EMPTY',
  6: 'EMPTY',
  7: 'EMPTY',
  8: 'EMPTY'
}

io.on('connection', (socket) => {
  const playerId = socket.id

  socket.on('matchReqest', (data) => {
    if (waitingRooms.length === 0) {
      const waitingRoom = {
        roomId: uuid.v4(),
        player1: playerId
      }
      waitingRooms.push(waitingRoom)
      socket.join(waitingRoom.roomId)
      io.to(waitingRoom.roomId).emit('waitingRoomFound', waitingRoom)
      setTimeout( ()=> {
        waitingRooms.find( (room, index, array) => {
          if(room.roomId === waitingRoom.roomId) {
            const match = {
              ...waitingRooms.shift(),
              player2: 'ROBOT',
              boardState: {
                ...INITIAL_BOARDSTATE
              }
            }
            liveMatches.push(match)
            io.to(match.roomId).emit('opponentFound', match)
          }
        })
      }, 6000)
    } else {
      const match = {
        ...waitingRooms.shift(),
        player2: playerId,
        boardState: {
          ...INITIAL_BOARDSTATE
        }
      }
      liveMatches.push(match)
      socket.join(match.roomId)
      io.to(match.roomId).emit('opponentFound', match)
    }
  })

  socket.on('moveMade', (data) =>{
    console.log(data)
    const playerId = data.playerId
    const position = data.position
    const matchId = data.matchId


    liveMatches.find( (match, index, array) => {
      if(match.roomId === matchId) {
        array[index].boardState[position] = playerId
        io.to(matchId).emit('moveRecorded', {
          playerId,
          position
        })
        let winResult = winChecker(array[index].boardState)
        if (winResult) {
          io.to(matchId).emit('winner', {
            ...winResult
          })
          array.splice(index, 1)
        }
        if(match.player2 === 'ROBOT' && !winResult) {
          console.log('ROBOT DETECTED')
          let wait =  Math.floor(Math.random() * 6000)
          setTimeout( () => {
            const move = ai(array[index].boardState)
            array[index].boardState[move] = 'ROBOT'
            io.to(matchId).emit('moveRecorded', {
              playerId: 'ROBOT',
              position: move
            })
            let winResult = winChecker(array[index].boardState)
            if (winResult) {
              io.to(matchId).emit('winner', {
                ...winResult
              })
              array.splice(index, 1)
            }
          }, wait)
        }
      }
    })
  })

  socket.on('disconnect', ()=>{
    liveMatches.find( (match, index, array) => {
      if((match.player1 === playerId) || (match.player2 === playerId)) {
        io.to(match.roomId).emit('opponentDisconnected')
        array.splice(index, 1)
        return
      }
    })

    waitingRooms.find( (room, index, array) => {
      if(room.player1 === playerId) {
        array.splice(index, 1)
        return
      }
    })
  })

})
