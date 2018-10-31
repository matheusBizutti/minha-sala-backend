const express = require('express');
const router = express.Router();

const schedule_request_controller = require('../../controllers/schedule/schedule.controller');

router.get('/:id', schedule_request_controller.schedule_request_details);

router.get('/:date/:roomId', schedule_request_controller.schedule_request_filterByDateAndRoom);

router.get('/list/:dateInit/:dateEnd', schedule_request_controller.schedule_request_schedules);

router.post('/create', schedule_request_controller.schedule_request_create);

router.put('/:id/update', schedule_request_controller.schedule_request_update);

router.delete('/:id/delete', schedule_request_controller.schedule_request_delete);

router.delete('/deleteAll', schedule_request_controller.schedule_request_deleteAll);

module.exports = router;