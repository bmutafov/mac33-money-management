'use strict';
const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const keys = require('./config/keys');
const passportSetup = require('./config/passport-setup');
const passport = require('passport');
const cookieSession = require('cookie-session ');

const app = express();
const PORT = process.env.PORT || 8080;
const authRoutes = require('./routes/auth');

// allow cross-origin request
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// connect to mongo db
mongoose.connect(keys.db.devConnect, { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('Connected established to mLab database. Can you believe it?'))
  .on('error', (e) => console.log('Connection error!', e));
mongoose.set('useFindAndModify', false);

app.use(cookieSession({
  maxAge: 31 * 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}))

// set up auth routes
app.use('/auth', authRoutes);

// set up graphiql
app.use('/graphiql', graphqlHTTP({
  schema,
  graphiql: true,
}));


// open a listening port
app.listen(PORT, () => {
  console.log(`now listening for requests on port ${PORT}`);
});