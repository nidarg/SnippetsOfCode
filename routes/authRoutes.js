
const{login,register,getCurrentUser} = require('../controllers/authController')
const authenticationMiddleware= require('../middleware/authentication')

const express = require('express')
const router = express.Router()

router.post('/register',register)
// router.get('/logout', logout);
router.post('/login',login)
router.route('/getCurrentUser').get(authenticationMiddleware,getCurrentUser);
module.exports = router