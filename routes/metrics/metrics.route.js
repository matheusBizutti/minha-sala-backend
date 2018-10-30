const express = require('express');
const router = express.Router();

const metrics_controller = require('../../controllers/metrics/metrics.controller');

router.get('/:id', metrics_controller.metrics_details);

router.post('/create', metrics_controller.metrics_create);

module.exports = router;