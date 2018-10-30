const express = require('express');
const router = express.Router();

const authenticate_controller = require('../../controllers/authenticate/authenticate.controller');

router.post('/signup', authenticate_controller.authenticate_signup);

router.post('/signin', authenticate_controller.authenticate_signin);

module.exports = router;