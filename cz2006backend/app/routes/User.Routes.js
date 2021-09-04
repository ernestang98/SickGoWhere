const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const Auth = require('../middleware/Auth')

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/user/:userId', Auth.Verify, userController.getUser);

router.post('/verify', userController.verifyCode);

router.post('/resend', userController.resendCode);

module.exports = router;
