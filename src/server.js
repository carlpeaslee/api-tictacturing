import express from 'express'
import expressGraphQL from 'express-graphql'
import schema from './data/schema'
import jwt from 'express-jwt'
import cors from 'cors'
import db from './data/db'

const app = express();

app.set('port', (process.env.PORT || 3001));

// PRODUCTION
const secret = process.env.AUTH_SECRET

//DEVELOPMENT
// import authSecret from '../authSecret'
// const secret = authSecret


var jwtCheck = jwt({
  secret: new Buffer(secret, 'base64'),
  audience: '8FyGCf7RZKCjVFKuzAqSMsrHNZ5AKvrr',
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


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
