var express = require('express')
var router = express.Router()
const userCtrl = require('../Controller/User')
const authMDWRE = require ('../Middlewares/Auth')

router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.post('/likeApartamento',authMDWRE.isAuth, userCtrl.likeApartamento)
router.post('/dislikeApartamento',authMDWRE.isAuth, userCtrl.dislikeApartment)
router.get('/isvalued',authMDWRE.isAuth, userCtrl.isValued)



module.exports = router;