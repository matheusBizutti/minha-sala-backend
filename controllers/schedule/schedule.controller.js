const Schedule = require('../../models/schedule/schedule.model');

exports.schedule_request_create = (req, res) => {
  const schedule_request = new Schedule(
    {
      title: req.body.title,
      roomId: req.body.roomId,
      scheduleTime: req.body.scheduleTime,
      userEmail: req.body.userEmail,
      department: req.body.department,
      status: req.body.status
    }
  );

  schedule_request.save((err) => {
    if (err) {
      res.send(err);
    }
    res.send('Schedule request: ' + schedule_request.title + ' created successfully');
  });
  
};

exports.schedule_request_filterByDateAndRoom = (req, res) => {

  getScheduleByDateAndRoom(req, res);

};

exports.schedule_request_details = (req, res) => {

  Schedule.findById(req.params.id, (err, schedule_request) => {
    if (err) return res.send(err);
    res.send(schedule_request);
  });

};

exports.schedule_request_update = (req, res) => {
  Schedule.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, schedule) => {
    if (err) return res.send(err);
    res.send('Schedule request udpated.');
  });
};

exports.schedule_request_delete = (req, res) => {
  Schedule.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.send(err);
    res.send('Deleted successfully!');
  })
};

exports.schedule_request_deleteAll = (req, res) => {
  Schedule.remove({}, (err) => {
    if (err) return res.send(err);
    res.send('Deleted all Schedules requests successfully!');
  })
};


// - Functions
function getScheduleByDateAndRoom(req, res) {
  
  const query  = Schedule.where({ roomId: req.params.roomId, scheduleTime: req.params.date }); 

  query.findOne((err, schedule) => {
    if (err) return res.send(err)
    res.json(schedule);
  });
};