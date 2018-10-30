const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

const meeting_room = require('./routes/meeting-room/meeting-room.route');
const schedule_request = require('./routes/schedule/schedule.route');
const metrics = require('./routes/metrics/metrics.route');

app.use('/meeting-room', meeting_room);
app.use('/schedule-request', schedule_request);
app.use('/metrics', metrics);

app.listen(port, () => {
  console.log('Server is up and running on port number ' + port);
});
