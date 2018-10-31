const express = require('express');
const router = express.Router();

const meeting_room_controller = require('../../controllers/meeting-room/meeting-room.controller');

router.get('/:id', meeting_room_controller.meeting_room_details);

router.get('/list/:status', meeting_room_controller.meeting_room_list);

router.post('/create', meeting_room_controller.meeting_room_create);

router.put('/:id/update', meeting_room_controller.meeting_room_update);

router.delete('/:id/delete', meeting_room_controller.meeting_room_delete);

router.delete('/deleteAll', meeting_room_controller.meeting_room_deleteAll);

module.exports = router;