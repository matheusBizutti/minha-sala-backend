const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// mongoose definitions
let dev_db_url = 'mongodb://luizalabs:luiza123@ds245523.mlab.com:45523/meeting-room-management'; 
let mongoDB = process.env.MONGODB_URI || dev_db_url;

// - mongoose connect
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

let port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

const apiRoutes = express.Router(); 

apiRoutes.use((req, res, next) => {

  const token = req.headers['authorization'] ? req.headers['authorization'].replace(/^Bearer\s/, '') : '';

  if (token) {

    jwt.verify(token, 'luizalabs2018', (err, decoded) => {
      if (err) {
        return res.status(401).send({ 
          success: false, 
          message: 'Failed to authenticate token.' 
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {

    return res.status(403).send({ 
      success: false, 
      message: 'No token provided.' 
    });

  }

});

app.use('/api', apiRoutes);

const meeting_room = require('./routes/meeting-room/meeting-room.route');
const schedule_request = require('./routes/schedule/schedule.route');
const metrics = require('./routes/metrics/metrics.route');
const auth = require('./routes/authenticate/authenticate.route');

app.use('/api/meeting-room', meeting_room);
app.use('/api/schedule-request', schedule_request);
app.use('/api/metrics', metrics);
app.use('/authenticate', auth);

app.listen(port, () => {
  console.log('Server is up and running on port number ' + port);
});
