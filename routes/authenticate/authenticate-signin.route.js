const express = require('express');
const router = express.Router();

const authenticate_controller = require('../../controllers/authenticate/authenticate.controller');

router.post('/signin', authenticate_controller.authenticate_signin);

module.exports = router;