'use strict';
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// allow cross-origin request
app.use(cors());


// connect to mongo db
mongoose.connect('mongodb://quintero:test123@ds063769.mlab.com:63769/money_management', { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('Connected established to mLab database. Can you believe it?'))
  .on('error', (e) => console.log('Connection error!', e));

app.use(express.static(path.join(__dirname, 'client/build')))

// set up graphiql
app.use('/graphql', graphqlHTTP({
  schema,
}));

app.use('/secretgraphiql', graphqlHTTP({
  schema,
  graphiql: true,
}))


// open a listening port
app.listen(PORT, () => {
  console.log(`now listening for requests on port ${PORT}`);
});