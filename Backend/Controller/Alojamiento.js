const driver = require("../Conector/connector");
const alojModel = require("../Modelo/Alojamiento");
function getFiltered(req, res) {
  var where = "";

  if (Object.keys(req.query).length > 0) {
    where = "WHERE ";
    const filtros = req.query;
    for (filtro in req.query) {
      if (filtro == "rooms") {
        where += "a.rooms >= $rooms";
        filtros.rooms = parseInt(filtros.rooms);
      }
      if (filtro == "bathrooms") {
        where += "a.bathrooms >= $bathrooms";
        filtros.bathrooms = parseInt(filtros.bathrooms);
      }
      if (filtro == "hasLift") {
        where += "a.hasLift = $hasLift";
        filtros.hasLift = filtros.hasLift === "true" ? true : false;
      }
      if (filtro == "exterior") {
        where += "a.hasLift = $hasLift";
        filtros.hasLift = filtros.hasLift === "true" ? true : false;
      }
      if (filtro == "propertyType") {
        where += "a.propertyType = $propertyType";
      }
      if (filtro == "status") {
        where += "a.status = $status";
      }
      where += " AND ";
    }
    where = where.slice(0, where.length - 4);
  }

  console.log(where);

  const session = driver.session();
  session
    //.run('MATCH (n:Vehicle) RETURN n')
    .run(
      "MATCH (a:Alojamiento)" +
        where +
        " return a.propertyCode, a.thumbnail, a.numPhotos,  a.price, a.propertyType, a.operation, a.size, a.exterior, a.rooms, a.bathrooms, a.address, a.province, a.municipality, a.url, a.description, a.status, a.priceByArea,a.detailedType,a.floor,a.district,a.neighborhood,a.hasLift,a.parkingSpace,a.suggestedTexts,ID(a)",
      req.query
    )
    .then(function (resultado) {
      console.log(resultado.records.length);
      var arrayCoches = [];
      resultado.records.forEach(function (instancia) {
        coche = {
          propertyCode: parseInt(instancia._fields[0]),
          thumbnail: instancia._fields[1],
          numPhotos: parseInt(instancia._fields[2]),
          price: parseFloat(instancia._fields[3]),
          propertyType: parseInt(instancia._fields[4]),
          operation: instancia._fields[5],
          size: instancia._fields[6],
          exterior: instancia._fields[7],
          rooms: parseInt(instancia._fields[8]),
          bathrooms: parseInt(instancia._fields[9]),
          address: instancia._fields[10],
          province: instancia._fields[11],
          municipality: instancia._fields[12],
          url: instancia._fields[13],
          description: instancia._fields[14],
          status: instancia._fields[15],
          priceByArea: instancia._fields[16],
          detailedType: instancia._fields[17],
          floor: instancia._fields[18],
          district: instancia._fields[19],
          neighborhood: instancia._fields[20],
          hasLift: instancia._fields[21],
          parkingSpace: instancia._fields[22],
          suggestedTexts: instancia._fields[23],
          id: parseInt(instancia._fields[24]),
        };

        //arrayPeliculas.push(peli); //meto el objeto en el array
        //console.log(instancia._fields[0].properties)
        //console.log(coche)

        //Una vez tenemos el coche con todos sus datos lo metemos en el arrray de objetos de tipo coche para ir por cada iteracion del foreach metiendo una instancia.
        arrayCoches.push(coche);
      });
      //console.log(arrayCoches)
      return res.status(200).send(arrayCoches);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function getAll(req, res) {
  alojModel.getAll().then((resultado) => {
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
module.exports = { getAll, getFiltered, getMasPopulares ,getRelacionados};
