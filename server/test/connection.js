const mongoose = require('mongoose');

// connect to mongo db
mongoose.connect('mongodb://quintero:test123@ds061938.mlab.com:61938/money', { useNewUrlParser: true });

mongoose.connection
  .once('open', () => console.log('Connected established to mLab database. Can you believe it?'))
  .on('error', (e) => console.log('Connection error!', e));