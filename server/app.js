const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
const _PORT = 5000;

// connect to mongo db
mongoose.connect('mongodb://quintero:test123@ds061938.mlab.com:61938/money', { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('Connected established to mLab database. Can you believe it?'))
  .on('error', (e) => console.log('Connection error!', e));


// set up graphiql
app.use('/graphiql', graphqlHTTP({
  schema,
  graphiql: true,
}));


// open a listening port
app.listen(_PORT, () => {
  console.log('now listening for requests on port ' + _PORT);
});