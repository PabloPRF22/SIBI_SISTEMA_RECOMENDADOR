const driver = require("../Conector/connector");
function getAll() {
  const session = driver.session();
  const promesa = session
    //.run('MATCH (n:Vehicle) RETURN n')
    .run(
      "MATCH (a:Host), (a)-[:IS]->(t:Type),(a)-[:HAS_PARKINGSPACE]->(p:ParkingSpace), (a)-[:HAS_NUM_ROOMS]->(r:Rooms),  (a)-[:HAS_NUM_BATHROOMS]->(b:Bathrooms) RETURN a.propertyCode, a.thumbnail, a.numPhotos, a.price, t.propertyType, a.operation, a.size, a.exterior, r.num, b.num, a.address, a.province, a.municipality, a.url, a.description, a.status, a.priceByArea,a.detailedType,a.floor,a.district,a.neighborhood,a.hasLift,p.available,p.price,a.suggestedTexts,ID(a)"
    )
    .then(function (resultado) {
      var arrayCoches = [];
      resultado.records.forEach(function (instancia) {
        let alojamiento = {
          propertyCode: parseInt(instancia._fields[0]), 
          thumbnail: instancia._fields[1],
          numPhotos: parseInt(instancia._fields[2]),
          price: instancia._fields[3] + "€",
          propertyType: parseInt(instancia._fields[4]),
          operation: instancia._fields[5],
          size: instancia._fields[6].low,
          exterior: instancia._fields[7],
          rooms: parseInt(instancia._fields[8]),
          bathrooms: parseInt(instancia._fields[9]),
          address: instancia._fields[10],
          province: instancia._fields[11],
          municipality: instancia._fields[12],
          url: instancia._fields[13],
          description: instancia._fields[14],
          status: instancia._fields[15] === "good" ? "Buen estado":instancia._fields[15] === "renew" ?"Necesita reforma": "Nueva construcción",
          priceByArea: instancia._fields[16],
          detailedType: instancia._fields[17],
          floor: instancia._fields[18] !== null ? parseInt (instancia._fields[18] ): "No disponible",
          district: instancia._fields[19],
          neighborhood: instancia._fields[20],
          hasLift: instancia._fields[21] ==true ? "Disponible": "No disponible",
          parkingSpaceAvailable: instancia._fields[22],
          parkingSpacePrice: instancia._fields[23] === '0' ? "Gratuito": instancia._fields[23] =! '0'  ? instancia._fields[23] =! 'NO DISPONIBLE' ? instancia._fields[23] + " €":  instancia._fields[23] + " €": instancia._fields[23] ,
          suggestedTexts: instancia._fields[24],
          id: parseInt(instancia._fields[25]),
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
function getFiltered(filtros) {
  let where
  let promesa 


  if (Object.keys(filtros).length > 0) {
    where = "WHERE ";
    for (filtro in filtros) {
      if (filtro == "rooms") {
        where += "r.num >= $rooms";
        filtros.rooms = parseInt(filtros.rooms);
      }
      if (filtro == "bathrooms") {
        where += "b.num >= $bathrooms";
        filtros.bathrooms = parseInt(filtros.bathrooms);
      }
      if (filtro == "hasLift") {
        filtros.hasLift = filtros.hasLift === "true" ? true : false;

        where += "a.hasLift = $hasLift";
      }
      if (filtro == "exterior") {
        filtros.exterior = filtros.exterior === "true" ? true : false;
        where += "a.exterior = $exterior";
      }
      if (filtro == "propertyType") {
        where += "t.propertyType = $propertyType";
      }
      if (filtro == "status") {
        where += "a.status = $status";
      }
      where += " AND ";
    }
    where = where.slice(0, where.length - 4);
    const session = driver.session();
      //.run('MATCH (n:Vehicle) RETURN n')
    promesa = session.run(
      "MATCH (a:Host), (a)-[:IS]->(t:Type),(a)-[:HAS_PARKINGSPACE]->(p:ParkingSpace), (a)-[:HAS_NUM_ROOMS]->(r:Rooms),(a)-[:HAS_NUM_BATHROOMS]->(b:Bathrooms)" +
        where +
        " return a.propertyCode, a.thumbnail, a.numPhotos,  a.price, t.propertyType, a.operation, a.size, a.exterior, r.num, b.num, a.address, a.province, a.municipality, a.url, a.description, a.status, a.priceByArea,a.detailedType,a.floor,a.district,a.neighborhood,a.hasLift,p.available,p.price,a.suggestedTexts,ID(a)",
      filtros
    )
    .then(function (resultado) {
      console.log(resultado.records.length);
      let alojamientos = [];
      resultado.records.forEach(function (instancia) {
        alojamiento = {
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
          parkingSpaceAvailable: instancia._fields[22],
          parkingSpacePrice: instancia._fields[23],
          suggestedTexts: instancia._fields[24],
          id: parseInt(instancia._fields[25]),
        };

        //arrayPeliculas.push(peli); //meto el objeto en el array
        //console.log(instancia._fields[0].properties)
        //console.log(coche)

        //Una vez tenemos el coche con todos sus datos lo metemos en el arrray de objetos de tipo coche para ir por cada iteracion del foreach metiendo una instancia.
        alojamientos.push(alojamiento);
      });
      //console.log(arrayCoches)
      return alojamientos;
    })
    .catch(function (error) {
      console.log(error)
      session.close();

      return [];
    });
  }else{
  
  }
  return promesa;


}

function getRelatedHosts(alojamiento) {
  const session = driver.session();
  let query = "MATCH (a:Host)-[:IS]->(t), (a)-[:HAS_NUM_ROOMS]->(r), (a)-[:HAS_PARKINGSPACE]->(p), (a)-[:HAS_NUM_BATHROOMS]->(b) WITH a,t,r,b,p, collect(CASE r.num WHEN "+alojamiento.rooms+" THEN 5 ELSE 0 END) as habitaciones, collect(CASE b.num WHEN "+alojamiento.bathrooms+" THEN 4 ELSE 0 END) as banios, collect(CASE a.district WHEN '"+alojamiento.district+"' THEN 10 ELSE 0 END) as distrito, collect(CASE a.neighborhood WHEN '"+alojamiento.neighborhood+"' THEN 6 ELSE 0 END) as barrio, collect(CASE a.address WHEN '"+alojamiento.address+"' THEN 3 ELSE 0 END) as calle,collect(CASE t.propertyType WHEN "+alojamiento.propertyType+" THEN 5 ELSE 0 END) as tipo with a,t,r,b,p, gds.similarity.cosine([5,4,10,6,3,5], habitaciones+banios+distrito+barrio+calle+tipo) as cosineSimilarity where cosineSimilarity > 0.79 and cosineSimilarity <0.9388911479387401  return  a.propertyCode, a.thumbnail, a.numPhotos, a.price, t.propertyType, a.operation, a.size, a.exterior, r.num, b.num, a.address, a.province, a.municipality, a.url, a.description, a.status, a.priceByArea,a.detailedType,a.floor,a.district,a.neighborhood,a.hasLift,p.available,p.price,a.suggestedTexts,ID(a), cosineSimilarity ORDER BY cosineSimilarity DESC LIMIT 10"
  console.log(query)
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

      var arrayAlojamientos = [];
      response.records.forEach(function (instancia) {

        let alojamiento = {
          propertyCode: parseInt(instancia._fields[0]), 
          thumbnail: instancia._fields[1],
          numPhotos: parseInt(instancia._fields[2]),
          price: instancia._fields[3] + "€",
          propertyType: parseInt(instancia._fields[4]),
          operation: instancia._fields[5],
          size: instancia._fields[6].low,
          exterior: instancia._fields[7],
          rooms: parseInt(instancia._fields[8]),
          bathrooms: parseInt(instancia._fields[9]),
          address: instancia._fields[10],
          province: instancia._fields[11],
          municipality: instancia._fields[12],
          url: instancia._fields[13],
          description: instancia._fields[14],
          status: instancia._fields[15] === "good" ? "Buen estado":instancia._fields[15] === "renew" ?"Necesita reforma": "Nueva construcción",
          priceByArea: instancia._fields[16],
          detailedType: instancia._fields[17],
          floor: instancia._fields[18] !== null ? parseInt (instancia._fields[18] ): "No disponible",
          district: instancia._fields[19],
          neighborhood: instancia._fields[20],
          hasLift: instancia._fields[21] ==true ? "Disponible": "No disponible",
          parkingSpaceAvailable: instancia._fields[22],
          parkingSpacePrice: instancia._fields[23] === '0' ? "Gratuito": instancia._fields[23] =! '0'  ? instancia._fields[23] =! 'NO DISPONIBLE' ? instancia._fields[23] + " €":  instancia._fields[23] + " €": instancia._fields[23] ,
          suggestedTexts: instancia._fields[24],
          id: parseInt(instancia._fields[25]),
        };
        arrayAlojamientos.push(alojamiento);
      });
      session.close();
      return arrayAlojamientos;
    })
    .catch((error) => {
      console.log(error)
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
      "MATCH (a:Host),(u:User)-[re:LIKE]->(a),(a)-[:IS]->(t:Type),(a)-[:HAS_PARKINGSPACE]->(p:ParkingSpace), (a)-[:HAS_NUM_ROOMS]->(r:Rooms), (a)-[:HAS_NUM_BATHROOMS]->(b:Bathrooms) return a.propertyCode, a.thumbnail, a.numPhotos, a.price, t.propertyType, a.operation, a.size, a.exterior, r.num, b.num, a.address, a.province, a.municipality, a.url, a.description, a.status, a.priceByArea,a.detailedType,a.floor,a.district,a.neighborhood,a.hasLift,p.available,p.price,a.suggestedTexts,ID(a), count(re) as n ORDER BY n "
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
          price: instancia._fields[3] + "€",
          propertyType: parseInt(instancia._fields[4]),
          operation: instancia._fields[5],
          size: instancia._fields[6].low,
          exterior: instancia._fields[7],
          rooms: parseInt(instancia._fields[8]),
          bathrooms: parseInt(instancia._fields[9]),
          address: instancia._fields[10],
          province: instancia._fields[11],
          municipality: instancia._fields[12],
          url: instancia._fields[13],
          description: instancia._fields[14],
          status: instancia._fields[15] === "good" ? "Buen estado":instancia._fields[15] === "renew" ?"Necesita reforma": "Nueva construcción",
          priceByArea: instancia._fields[16],
          detailedType: instancia._fields[17],
          floor: instancia._fields[18] !== null ? parseInt (instancia._fields[18] ): "No disponible",
          district: instancia._fields[19],
          neighborhood: instancia._fields[20],
          hasLift: instancia._fields[21] ==true ? "Disponible": "No disponible",
          parkingSpaceAvailable: instancia._fields[22],
          parkingSpacePrice: instancia._fields[23] === '0' ? "Gratuito": instancia._fields[23] =! '0'  ? instancia._fields[23] =! 'NO DISPONIBLE' ? instancia._fields[23] + " €":  instancia._fields[23] + " €": instancia._fields[23] ,
          suggestedTexts: instancia._fields[24],
          id: parseInt(instancia._fields[25]),
          likes: instancia._fields[26],

        };
        console.log(alojamiento)
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
module.exports = { getNLikeofHosts,getAll,getRelatedHosts,getFiltered};
