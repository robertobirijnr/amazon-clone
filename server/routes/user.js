const express = require('express');
const router = express.Router();
const { signUp,userProfile ,signIn} = require('../controllers/user')
const verifyToken = require('../middlewares/verifyToken')


router.post('/register',signUp)
router.post('/login',signIn)
router.get('/profile',verifyToken ,userProfile)


module.exports = router