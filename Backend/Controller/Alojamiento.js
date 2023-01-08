const driver = require("../Conector/connector");
const alojModel = require("../Modelo/Alojamiento");
function getFiltered(req, res) {
  alojModel.getFiltered(req.query)
  .then((response)=>{
    return res.status(200).send(response);

  })
  .catch((error)=>{
    return res.status(404).send(error);


  })

  
}
function getAll(req, res) {
  alojModel.getAll().then((resultado) => {
    return res.status(200).send(resultado)
  }).catch((error) =>{
    return res.status(500).send(error)
  }); 
 
}
function getAlojamientosBaratos(req, res) {
  alojModel.getAlojamientosBaratos().then((resultado) => {
    return res.status(200).send(resultado)
  }).catch((error) =>{
    return res.status(500).send(error)
  }); 
 
}
async function getMasPopulares(req, res) {
  alojModel.getNLikeofHosts().then((resultado) => {
    return res.status(200).send(resultado)
  }).catch((error) =>{
    return res.status(500).send(error)
  }); 
}
async function getRelacionados(req, res) {
  let alojamiento = req.body
  alojModel.getRelatedHosts(alojamiento).then((resultado) => {
    return res.status(200).send(resultado)
  }).catch((error) =>{
    return res.status(500).send(error)
  }); 
}
module.exports = { getAll, getFiltered, getMasPopulares ,getRelacionados,getAlojamientosBaratos};
