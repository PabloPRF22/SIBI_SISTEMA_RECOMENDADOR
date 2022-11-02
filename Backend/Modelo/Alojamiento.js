const driver = require("../Conector/connector");
function getAll() {
  const session = driver.session();
  const promesa = session
    //.run('MATCH (n:Vehicle) RETURN n')
    .run(
      "MATCH (a:Alojamiento) RETURN a.propertyCode, a.thumbnail, a.numPhotos, a.price, a.propertyType, a.operation, a.size, a.exterior, a.rooms, a.bathrooms, a.address, a.province, a.municipality, a.url, a.description, a.status, a.priceByArea,a.detailedType,a.floor,a.district,a.neighborhood,a.hasLift,a.parkingSpace,a.suggestedTexts,ID(a)"
    )
    .then(function (resultado) {
      var arrayCoches = [];
      resultado.records.forEach(function (instancia) {
        let alojamiento = {
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
        arrayCoches.push(alojamiento);
      });
      //console.log(arrayCoches)
      session.close();
      return arrayCoches;
    })
    .catch(function (error) {
      session.close();

      return [];
    });
  return promesa;
}
function getRelatedHosts(alojamiento) {
  const session = driver.session();
  let query = "MATCH (a:Alojamiento) WITH a, collect(CASE a.rooms WHEN "+alojamiento.rooms+" THEN 4 ELSE 0 END) as habitaciones,collect(CASE a.bathrooms WHEN '"+alojamiento.bathrooms+"' THEN 10 ELSE 0 END) as banios,   gds.alpha.similarity.cosine([4,10], habitaciones+banios) as cosineSimilarity where cosineSimilarity > 0.1 and cosineSimilarity <1.0 return a.propertyCode, a.thumbnail, a.numPhotos, a.price, a.propertyType, a.operation, a.size, a.exterior, a.rooms, a.bathrooms, a.address, a.province, a.municipality, a.url, a.description, a.status, a.priceByArea,a.detailedType,a.floor,a.district,a.neighborhood,a.hasLift,a.parkingSpace,a.suggestedTexts,ID(a), cosineSimilarity ORDER BY cosineSimilarity DESC"
  const promesa = session
    //.run('MATCH (n:Vehicle) RETURN n')
    .run(
      query
    )
    .then((response) => {
      if (response.records.length == 0) {
        session.close();
        return [];
      }

      var arrayCoches = [];
      response.records.forEach(function (instancia) {
        let alojamiento = {
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
          likes: parseInt(instancia._fields[25]),
        };
        arrayCoches.push(alojamiento);
      });
      session.close();
      return arrayCoches;
    })
    .catch((error) => {
      session.close();

      return [];
    });
  return promesa;
}
function getNLikeofHosts() {
  const session = driver.session();
  const promesa = session
    //.run('MATCH (n:Vehicle) RETURN n')
    .run(
      "MATCH (a:Alojamiento),(u:User)-[r:LIKE]->(a:Alojamiento) RETURN a.propertyCode, a.thumbnail, a.numPhotos, a.price, a.propertyType, a.operation, a.size, a.exterior, a.rooms, a.bathrooms, a.address, a.province, a.municipality, a.url, a.description, a.status, a.priceByArea,a.detailedType,a.floor,a.district,a.neighborhood,a.hasLift,a.parkingSpace,a.suggestedTexts,ID(a), count(r) as n ORDER BY n "
    )
    .then((response) => {
      if (response.records.length == 0) {
        session.close();
        return [];
      }

      var arrayCoches = [];
      response.records.forEach(function (instancia) {
        let alojamiento = {
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
          likes: parseInt(instancia._fields[25]),
        };
        arrayCoches.push(alojamiento);
      });
      session.close();
      return arrayCoches;
    })
    .catch((error) => {
      session.close();

      return [];
    });
  return promesa;
}
module.exports = { getNLikeofHosts,getAll,getRelatedHosts };
