LOAD CSV WITH HEADERS FROM 'file:///IdealistaDatabase.csv' AS line
CREATE (a:Host { propertyCode: line.propertyCode, thumbnail: line.thumbnail, numPhotos: toInteger(line.numPhotos), price: toFloat(line.price), operation: line.operation, size: toInteger(line.size), exterior: toBoolean(line.exterior), address: line.address, province: line.province, municipality: line.municipality, country: line.country, url:line.url,description: line.description,status:line.status,newDevelopment: line.newDevelopment,priceByArea:toInteger(line.priceByArea),suggestedTexts: line.suggestedTexts,topNewDevelopment: line.topNewDevelopment,floor: toInteger(line.floor),district: line.district,neighborhood: line.neighborhood,hasLift: toBoolean(line.hasLift),meGustas: 0})
MERGE (t:Type {propertyType: line.propertyType}) CREATE (a)-[:IS]->(t)
MERGE (r:Rooms {num: toInteger(line.rooms)}) CREATE (a)-[:HAS_NUM_ROOMS]->(r)
MERGE (b:Bathrooms {num: toInteger(line.bathrooms)}) CREATE (a)-[:HAS_NUM_BATHROOMS]->(b)
MERGE (p:ParkingSpace {available: toBoolean(line.parkingSpaceAvailable),price: line.priceParkingSpace}) CREATE (a)-[:HAS_PARKINGSPACE]->(p)



