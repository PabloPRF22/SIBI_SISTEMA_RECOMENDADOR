var express = require('express')
var router = express.Router()
const alojCtrl = require('../Controller/Alojamiento')


router.get('/getAll', alojCtrl.getAll)
router.get('/getFiltered', alojCtrl.getFiltered)
router.get('/getMasPopulares', alojCtrl.getMasPopulares)
router.post('/getRelacionados', alojCtrl.getRelacionados)



module.exports = router;