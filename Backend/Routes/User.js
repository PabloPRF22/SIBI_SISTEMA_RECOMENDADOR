var express = require('express')
var router = express.Router()
const userCtrl = require('../Controller/User')
const authMDWRE = require ('../Middlewares/Auth')

router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.get('/logged',userCtrl.isAuth)
router.post('/likeApartamento',authMDWRE.isAuth, userCtrl.likeApartamento)
router.post('/dislikeApartamento',authMDWRE.isAuth, userCtrl.dislikeApartment)
router.get('/isvalued',authMDWRE.isAuth, userCtrl.isValued)
router.post('/related',authMDWRE.isAuth, userCtrl.alojamientosRelatedUsers)
router.post('/recomendacionPersonalizada',authMDWRE.isAuth, userCtrl.alojamientosRecomendacionPersonalizada)

router.post('/preferences',authMDWRE.isAuth, userCtrl.setPreferences)
router.get('/preferences',authMDWRE.isAuth, userCtrl.getPreferences)



module.exports = router;