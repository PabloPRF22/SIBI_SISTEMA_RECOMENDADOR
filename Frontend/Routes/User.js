var express = require('express')
var router = express.Router()
const userCtrl = require('../Controller/User')


router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)



module.exports = router;