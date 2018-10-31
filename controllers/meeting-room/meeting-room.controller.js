const Meeting = require('./../../models/meeting-room/meeting-room.model');

exports.meeting_room_create = (req, res) => {
  const meeting_room = new Meeting(
    {
      name: req.body.name,
      capacity: req.body.capacity,
      status: req.body.status,
      datashow: req.body.datashow,
      description: req.body.description
    }
  );

  meeting_room.save((err) => {
    if (err) {
      res.send(err);
    }
    res.send('Meeting room: ' + meeting_room.name + ' created successfully');
  });
  
};

exports.meeting_room_details = (req, res) => {

  Meeting.findById(req.params.id, (err, meeting_room) => {
    if (err) return res.send(err);
    res.send(meeting_room);
  });

};

exports.meeting_room_list = (req, res) => {

  getMeetingsRoomByStatus(req, res);

};

exports.meeting_room_update = (req, res) => {
  Meeting.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, meeting) => {
    if (err) return res.send(err);
    res.send('Meeting room udpated.');
  });
};

exports.meeting_room_delete = (req, res) => {
  Meeting.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.send(err);
    res.send('Deleted successfully!');
  })
};

exports.meeting_room_deleteAll = (req, res) => {
  Meeting.remove({}, (err) => {
    if (err) return res.send(err);
    res.send('Deleted all meetings room successfully!');
  })
};


function getMeetingsRoomByStatus(req, res) {
  
  const query  = Meeting.where({ status: req.params.status }); 

  query.find((err, meetings) => {
    if (err) return res.send(err)
    res.json(meetings);
  });
};