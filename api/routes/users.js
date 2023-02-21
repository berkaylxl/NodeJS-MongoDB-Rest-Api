const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/check-auth')
const UsersController= require('../controllers/user');


router.post('/signup', UsersController.users_sign_up );

router.delete('/:userId', checkAuth, UsersController.users_delete );

router.post('/login',UsersController.users_login);



module.exports = router;