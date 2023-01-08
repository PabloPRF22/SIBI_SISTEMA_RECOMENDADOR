const userService = require("../services/User");
const token = require("../services/token");
const driver = require("../Conector/connector")



function register(req, res) {
    const session = driver.session();
    var newUser = req.body
    var validate = userService.verifyField(newUser)
    console.log(validate)
    console.log(validate.message)


    if (validate.okey == false) {
        return res.status(400).send(validate)
    }

    return session.run('MATCH (user:User {email: $email}) RETURN user', {
        email: newUser.email
    })
        .then(results => {

            if (results.records.length != 0) {
                validate.message = "Ya existe un usuario con ese correo"
                return res.status(400).send(validate)
            } else {
                return session.run('CREATE (user:User {email: $email,nombre: $nombre,apellidos: $apellidos,rangoEdades: $rangoEdades,password: $password,distrito: $distrito,ocupacion: $ocupacion, estadoCivil: $estadoCivil,hijos: $hijos}) RETURN user', {
                    email: req.body.email,
                    nombre: req.body.nombre,
                    apellidos: req.body.apellidos,
                    rangoEdades: req.body.edad,
                    distrito: req.body.distrito,
                    ocupacion: req.body.ocupacion,
                    estadoCivil: req.body.estadoCivil,
                    hijos: req.body.hijos,
                    password: req.body.password1,
                }).then(results => {

                    validate.message = "Bienvenido " + req.body.nombre + " en 5 segundos sera redirigido a el login"
                    return res.status(200).send(validate)
                }).catch(error => {

                    return res.status(500).send({ message: "Error interno del servidor" })
                }).finally(() => {
                    session.close()
                })

            }
        });
};
function login(req, res) {
    console.log("llegue")
    var userData = req.body
    const session = driver.session();
    return session.run('MATCH (user:User {email: $email, password: $password}) RETURN user', {
        email: userData.email,
        password: userData.password
    })
        .then(results => {
            if (results.records.length != 0) {
                results.records.forEach(function (instancia) {

                    let user = {
                        email: instancia._fields[0].properties.email,
                        nombre: instancia._fields[0].properties.nombre,
                        apellidos: instancia._fields[0].properties.apellidos,
                        distrito: instancia._fields[0].properties.distrito,
                        rangoEdad: instancia._fields[0].properties.rangoEdades,
                        estadoCivil: instancia._fields[0].properties.estadoCivil,
                        ocupacion: instancia._fields[0].properties.ocupacion,
                        hijos: instancia._fields[0].properties.hijos,

                    };
                    session.close()
                    return res.status(200).send({ user: user, token: token.createToken(userData.email,) })

                });


            } else {
                return res.status(400).send({ message: "El email o la contraseña son incorrectos" })

            }

        }).catch(() => {
            return res.status(500).send({ message: "Internal error" })

        }).finally(() => {
            session.close()
        })



}
function isValued(req, res) {
    console.log(parseInt(req.query.propertyCode))
    const session = driver.session();
    let query = "MATCH (u:User {email:'" + res.locals.email + "'})-[r:LIKE|DISLIKE]->(a:Host {propertyCode:'" + req.query.propertyCode + "'}) RETURN r"
    console.log(query)
    return session.run(query)

        .then(results => {

            if (results.records.length != 0) {

                if (results.records[0]._fields[0].type == "LIKE") {
                    return res.status(201).send({ status: "LIKE" })
                }
                return res.status(201).send({ status: "DISLIKE" })

            }
            return res.status(201).send({ status: "null" })
        })
}
function likeApartamento(req, res) {
    let status = req.body.status
    console.log(res.locals.email)
    console.log(req.body.propertyCode)
    const session = driver.session();
    console.log(status)
    if (status == 'LIKE') return res.status(304).send({ message: "No changes" })
    else {
        session.run('MATCH (u:User {email: $email}),(a:Host {propertyCode: $propertyCode}) CREATE(u)-[r:LIKE]->(a)  RETURN r', {
            email: res.locals.email,
            propertyCode: '' + req.body.propertyCode

        })
            .then((result) => {
                console.log(result)
                if (status == "DISLIKE") {
                    session.run('MATCH (u:User {email: $email})-[r:DISLIKE]->(a:Host {propertyCode: $propertyCode}) DELETE r', {
                        email: res.locals.email,
                        propertyCode: req.body.propertyCode

                    })
                        .then(result2 => {

                            session.close()
                            return res.status(200).send({ message: "Le diste like" })
                        })


                } else {
                    return res.status(200).send({ message: "Le diste like" })

                }
            })

    }


}
function setPreferences(req, res) {
    const session = driver.session();
    const preferencias = req.body
    const ascensor = preferencias.ascensor === 'Disponible' ? true : false
    const garaje = preferencias.garaje === 'Disponible' ? true : false
    session.run("MATCH (u:User {email: '" + res.locals.email + "'}),(u)-[r:HAS_PREFERENCES]->(p) DETACH DELETE p", {})
        .then((result) => {
            session.run("MATCH (u:User {email: '" + res.locals.email + "'}) CREATE (a:Preferences {habitaciones: " + preferencias.habitaciones + ',banios: ' + preferencias.banios + ',ascensor: ' + ascensor + ',piso: ' + preferencias.piso + ",garajeAvailable: '" + preferencias.garajeAvailable + "',garajePrecio: '" + preferencias.garajePrecio + "',municipio: '" + preferencias.municipio + "'  }) CREATE(u)-[r:HAS_PREFERENCES]->(a)  RETURN r", {})
                .then((result) => {
                    res.status(200).send({ message: "Se han establecido sus preferencias" })

                })
        })
}
function getPreferences(req, res) {
    const session = driver.session();
    session.run("MATCH (u:User {email: '" + res.locals.email + "'}),(u)-[r:HAS_PREFERENCES]->(p) return p", {})
        .then((result) => {
            if (result.records.length > 0) {

                let preferencias = {
                    habitaciones: result.records[0]._fields[0].properties.habitaciones.low,
                    banios: result.records[0]._fields[0].properties.banios.low,
                    ascensor: result.records[0]._fields[0].properties.ascensor,
                    garajePrecio: result.records[0]._fields[0].properties.garajePrecio,
                    garajeAvailable: result.records[0]._fields[0].properties.garajeAvailable,
                    municipio: result.records[0]._fields[0].properties.municipio,
                    piso: result.records[0]._fields[0].properties.piso.low,



                }
                res.status(200).send({ preferences: preferencias })
            }
            else {
                let preferencias = {
                    habitaciones: null,

                    banios: null,
                    ascensor: null,
                    piso: null,
                    garaje: null,
                    precioGaraje: null,
                    municipio: null,
                }
                res.status(400).send({ preferences: preferencias })

            }
        })





}
function dislikeApartment(req, res) {
    let status = req.body.status
    const session = driver.session()
    if (status == 'DISLIKE') return res.status(304).send({ message: "No changes" })
    else {
        session.run('MATCH (u:User {email: $email}),(a:Host {propertyCode: $propertyCode}) CREATE(u)-[r:DISLIKE]->(a)  RETURN r', {
            email: res.locals.email,
            propertyCode: req.body.propertyCode

        })
            .then((result) => {
                if (status == "LIKE") {
                    return session.run('MATCH (u:User {email: $email})-[r:LIKE]->(a:Host {propertyCode: $propertyCode}) DELETE r', {
                        email: res.locals.email,
                        propertyCode: req.body.propertyCode

                    })
                        .then(result2 => {

                            session.close()
                            return res.status(200).send({ message: "Le diste dislike" })
                        })


                } else {
                    return res.status(200).send({ message: "Le diste dislike" })

                }
            })

    }
}
function isAuth(req, res) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "No tienes autorización" });
    } else {
        const tokenValue = req.headers.authorization.split(" ")[1];

        token.decodeToken(tokenValue)
            .then((response) => {
                const session = driver.session();
                session.run('MATCH (user:User {email: $email}) RETURN user', {
                    email: response,

                })
                    .then((results) => {
                        let user
                        results.records.forEach(function (instancia) {

                            user = {
                                email: instancia._fields[0].properties.email,
                                nombre: instancia._fields[0].properties.nombre,
                                apellidos: instancia._fields[0].properties.apellidos,
                                distrito: instancia._fields[0].properties.distrito,
                                rangoEdad: instancia._fields[0].properties.rangoEdades,
                                estadoCivil: instancia._fields[0].properties.estadoCivil,
                                ocupacion: instancia._fields[0].properties.ocupacion,
                                hijos: instancia._fields[0].properties.hijos,

                            };
                        })
                        session.close()
                        return res.status(200).send({ user: user })
                    })
                    .catch((error) => {
                        console.log(error)
                        return res.status(500).send({ message: "Internal error" })

                    })




            })
            .catch((error) => {
                return res.status(error.status).send(error.message);
            });
    }
}
function alojamientosRelatedUsers(req, res) {
    let currentUser = req.body.currentUser
    const session = driver.session()
    //console.log("MATCH (u:User) WITH u, collect(CASE u.estadoCivil WHEN '"+currentUser.estadoCivil+"' THEN 3 ELSE 0 END) as estadoCivil, collect(CASE u.rangoEdades WHEN '"+currentUser.rangoEdad+"' THEN 5 ELSE 0 END) as edad, collect(CASE u.ocupacion WHEN '"+currentUser.ocupacion+"' THEN 5 ELSE 2 END) as ocupacion, collect(CASE u.hijos WHEN "+currentUser.hijos+" THEN 4 ELSE 0 END) as hijos, collect(CASE u.distrito WHEN '"+currentUser.distrito+"' THEN 10 ELSE 0 END) as distrito with u,  gds.similarity.cosine([3,5,5,4,10], estadoCivil+edad+ocupacion+hijos+distrito) as cosineSimilarity WHERE cosineSimilarity >= 0.94 WITH u MATCH (u:User)-[:LIKE]->(a:Host),(a)-[:IS]->(t:Type),(a)-[:HAS_PARKINGSPACE]->(p:ParkingSpace), (a)-[:HAS_NUM_ROOMS]->(r:Rooms), (a)-[:HAS_NUM_BATHROOMS]->(b:Bathrooms) return a.propertyCode, a.thumbnail, a.numPhotos, a.price, t.propertyType, a.operation, a.size, a.exterior, r.num, b.num, a.address, a.province, a.municipality, a.url, a.description, a.status, a.priceByArea,a.detailedType,a.floor,a.district,a.neighborhood,a.hasLift,p.available,p.price,a.suggestedTexts,ID(a)")
    session.run("MATCH (u:User) WITH u, " +
        "collect(CASE u.estadoCivil WHEN '" + currentUser.estadoCivil + "' THEN 3 ELSE 2 END) as estadoCivil," +
        "collect(CASE u.rangoEdades WHEN '" + currentUser.rangoEdad + "' THEN 5 ELSE 3 END) as edad," +
        "collect(CASE u.ocupacion WHEN '" + currentUser.ocupacion + "' THEN 7 ELSE 0 END) as ocupacion," +
        "collect(CASE u.hijos WHEN " + currentUser.hijos + " THEN 5 ELSE 0 END) as hijos, " +
        "collect(CASE u.distrito WHEN '" + currentUser.distrito + "' THEN 10 ELSE 0 END) as distrito " +
        "with u,  gds.similarity.cosine([3,5,7,5,10], estadoCivil+edad+ocupacion+hijos+distrito) as cosineSimilarity " +
        "WHERE cosineSimilarity >= 0.70 AND cosineSimilarity<1.0 WITH u MATCH (u:User)-[:LIKE]->(a:Host),(a)-[:IS]->(t:Type)," +
        "(a)-[:HAS_PARKINGSPACE]->(p:ParkingSpace), (a)-[:HAS_NUM_ROOMS]->(r:Rooms), " +
        "(a)-[:HAS_NUM_BATHROOMS]->(b:Bathrooms) " +
        "return a.propertyCode, a.thumbnail, a.numPhotos, a.price, t.propertyType, a.operation, a.size," +
        "a.exterior, r.num, b.num, a.address, a.province, a.municipality, a.url, a.description, a.status," +
        "a.priceByArea,a.detailedType,a.floor,a.district,a.neighborhood,a.hasLift,p.available,p.price,a.suggestedTexts,ID(a)")
        .then((result) => {
            if (result.records.length == 0) return res.status(304).send({ message: "No changes" })
            else {
                var arrayCoches = [];
                result.records.forEach(function (instancia) {
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
                        status: instancia._fields[15] === "good" ? "Buen estado" : instancia._fields[15] === "renew" ? "Necesita reforma" : "Nueva construcción",
                        priceByArea: instancia._fields[16],
                        detailedType: instancia._fields[17],
                        floor: instancia._fields[18] !== null ? parseInt(instancia._fields[18]) : "No disponible",
                        district: instancia._fields[19],
                        neighborhood: instancia._fields[20],
                        hasLift: instancia._fields[21] == true ? "Disponible" : "No disponible",
                        parkingSpaceAvailable: instancia._fields[22],
                        parkingSpacePrice: !instancia._fields[23] ? "No disponible" : instancia._fields[23].low > 0 ?  instancia._fields[23].low + " €" : "Gratuito",
                        suggestedTexts: instancia._fields[24],
                        id: parseInt(instancia._fields[25]),
                        likes: instancia._fields[26],

                    };
                    arrayCoches.push(alojamiento);

                })
                return res.status(200).send({ alojamientos: arrayCoches })
            }
        })
        .catch((error) => {

        })
    //console.log("MATCH (u:User) WITH u, collect(CASE u.estadoCivil WHEN '"+currentUser.estadoCivil+"' THEN 3 ELSE 0 END) as estadoCivil, collect(CASE u.rangoEdades WHEN '"+currentUser.rangoEdad+"' THEN 5 ELSE 0 END) as edad, collect(CASE u.ocupacion WHEN '"+currentUser.ocupacion+"' THEN 5 ELSE 2 END) as ocupacion, collect(CASE u.hijos WHEN "+currentUser.hijos+" THEN 4 ELSE 0 END) as hijos, collect(CASE u.distrito WHEN '"+currentUser.distrito+"' THEN 10 ELSE 0 END) as distrito with u,  gds.similarity.cosine([3,5,5,4,10], estadoCivil+edad+ocupacion+hijos+distrito) as cosineSimilarity WHERE cosineSimilarity >= 0.94 WITH u MATCH (u:User)-[:LIKES]->(a:Host) return a"    )

}
function alojamientosRecomendacionPersonalizada(req, res) {
    let currentUser = req.body.currentUser
    let preferencias = req.body.preferences
    const parkingAvalaible = preferencias.garajeAvailable == 'No disponible' ? false : true
    const parkingPrice = preferencias.garajePrecio == 'No disponible' ? "" : preferencias.garajePrecio === "Gratuito" ? " AND p.price =0.0 " : " AND p.price >0.0 "
    console.log(parkingPrice)
    const session = driver.session()
    console.log("MATCH (u:User) WITH u, " +
    "collect(CASE u.estadoCivil WHEN '" + currentUser.estadoCivil + "' THEN 3 ELSE 2 END) as estadoCivil," +
    "collect(CASE u.rangoEdades WHEN '" + currentUser.rangoEdad + "' THEN 5 ELSE 3 END) as edad," +
    "collect(CASE u.ocupacion WHEN '" + currentUser.ocupacion + "' THEN 7 ELSE 0 END) as ocupacion," +
    "collect(CASE u.hijos WHEN " + currentUser.hijos + " THEN 5 ELSE 0 END) as hijos, " +
    "collect(CASE u.distrito WHEN '" + currentUser.distrito + "' THEN 10 ELSE 0 END) as distrito " +
    "with u,  gds.similarity.cosine([3,5,7,5,10], estadoCivil+edad+ocupacion+hijos+distrito) as cosineSimilarity " +
    "WHERE cosineSimilarity >= 0.70 AND cosineSimilarity<1.0 WITH u MATCH (u:User)-[:LIKE]->(a:Host),(a)-[:IS]->(t:Type)," +
    "(a)-[:HAS_PARKINGSPACE]->(p:ParkingSpace), (a)-[:HAS_NUM_ROOMS]->(r:Rooms), " +
    "(a)-[:HAS_NUM_BATHROOMS]->(b:Bathrooms) " +
    " WHERE r.num = " + preferencias.habitaciones + " AND b.num = " + preferencias.banios +
    " AND a.floor <= " + preferencias.piso + " AND a.hasLift =" + preferencias.ascensor +
    " AND p.available =" + parkingAvalaible + parkingPrice +
    "return a.propertyCode, a.thumbnail, a.numPhotos, a.price, t.propertyType, a.operation, a.size," +
    "a.exterior, r.num, b.num, a.address, a.province, a.municipality, a.url, a.description, a.status," +
    "a.priceByArea,a.detailedType,a.floor,a.district,a.neighborhood,a.hasLift,p.available,p.price,a.suggestedTexts,ID(a)")
    //console.log("MATCH (u:User) WITH u, collect(CASE u.estadoCivil WHEN '"+currentUser.estadoCivil+"' THEN 3 ELSE 0 END) as estadoCivil, collect(CASE u.rangoEdades WHEN '"+currentUser.rangoEdad+"' THEN 5 ELSE 0 END) as edad, collect(CASE u.ocupacion WHEN '"+currentUser.ocupacion+"' THEN 5 ELSE 2 END) as ocupacion, collect(CASE u.hijos WHEN "+currentUser.hijos+" THEN 4 ELSE 0 END) as hijos, collect(CASE u.distrito WHEN '"+currentUser.distrito+"' THEN 10 ELSE 0 END) as distrito with u,  gds.similarity.cosine([3,5,5,4,10], estadoCivil+edad+ocupacion+hijos+distrito) as cosineSimilarity WHERE cosineSimilarity >= 0.94 WITH u MATCH (u:User)-[:LIKE]->(a:Host),(a)-[:IS]->(t:Type),(a)-[:HAS_PARKINGSPACE]->(p:ParkingSpace), (a)-[:HAS_NUM_ROOMS]->(r:Rooms), (a)-[:HAS_NUM_BATHROOMS]->(b:Bathrooms) return a.propertyCode, a.thumbnail, a.numPhotos, a.price, t.propertyType, a.operation, a.size, a.exterior, r.num, b.num, a.address, a.province, a.municipality, a.url, a.description, a.status, a.priceByArea,a.detailedType,a.floor,a.district,a.neighborhood,a.hasLift,p.available,p.price,a.suggestedTexts,ID(a)")
    session.run("MATCH (u:User) WITH u, " +
        "collect(CASE u.estadoCivil WHEN '" + currentUser.estadoCivil + "' THEN 3 ELSE 2 END) as estadoCivil," +
        "collect(CASE u.rangoEdades WHEN '" + currentUser.rangoEdad + "' THEN 5 ELSE 3 END) as edad," +
        "collect(CASE u.ocupacion WHEN '" + currentUser.ocupacion + "' THEN 7 ELSE 0 END) as ocupacion," +
        "collect(CASE u.hijos WHEN " + currentUser.hijos + " THEN 5 ELSE 0 END) as hijos, " +
        "collect(CASE u.distrito WHEN '" + currentUser.distrito + "' THEN 10 ELSE 0 END) as distrito " +
        "with u,  gds.similarity.cosine([3,5,7,5,10], estadoCivil+edad+ocupacion+hijos+distrito) as cosineSimilarity " +
        "WHERE cosineSimilarity >= 0.70 AND cosineSimilarity<1.0 WITH u MATCH (u:User)-[:LIKE]->(a:Host),(a)-[:IS]->(t:Type)," +
        "(a)-[:HAS_PARKINGSPACE]->(p:ParkingSpace), (a)-[:HAS_NUM_ROOMS]->(r:Rooms), " +
        "(a)-[:HAS_NUM_BATHROOMS]->(b:Bathrooms) " +
        " WHERE r.num = " + preferencias.habitaciones + " AND b.num = " + preferencias.banios +
        " AND a.floor <= " + preferencias.piso + " AND a.hasLift =" + preferencias.ascensor +
        " AND p.available =" + parkingAvalaible + parkingPrice +
        "return a.propertyCode, a.thumbnail, a.numPhotos, a.price, t.propertyType, a.operation, a.size," +
        "a.exterior, r.num, b.num, a.address, a.province, a.municipality, a.url, a.description, a.status," +
        "a.priceByArea,a.detailedType,a.floor,a.district,a.neighborhood,a.hasLift,p.available,p.price,a.suggestedTexts,ID(a)")
        .then((result) => {
            console.log(result)
            if (result.records.length === 0) {
                session.run("MATCH (a:Host)-[:IS]->(t), (a)-[:HAS_NUM_ROOMS]->(r), (a)-[:HAS_PARKINGSPACE]->(p), (a)-[:HAS_NUM_BATHROOMS]->(b)" +
                    "WITH a,t,r,b,p, collect(CASE r.num WHEN " + preferencias.habitaciones + " THEN 5 ELSE 0 END) as habitaciones, " +
                    "collect(CASE b.num WHEN " + preferencias.banios + " THEN 5 ELSE 0 END) as banios," +
                    "collect(CASE a.hasLift WHEN " + preferencias.ascensor + " THEN 5 ELSE 0 END) as ascensor," +
                    "collect(CASE p.available WHEN " + parkingAvalaible + " THEN 5 ELSE 0 END) as garaje," +
                    "collect(CASE a.floor WHEN " + preferencias.piso + " THEN 5 ELSE 0 END) as piso," +
                    "collect(CASE a.municipality WHEN '" + preferencias.municipio + "' THEN 5 ELSE 0 END) as municipio " +

                    "with a,t,r,b,p, gds.similarity.cosine([5,5,5,5,5,5], habitaciones+banios+ascensor+garaje+piso+municipio)" +
                    "as cosineSimilarity where cosineSimilarity > 0.91  " +
                    "return  a.propertyCode, a.thumbnail, a.numPhotos, a.price, t.propertyType, a.operation," +
                    "a.size, a.exterior, r.num, b.num, a.address, a.province, a.municipality," +
                    "a.url, a.description, a.status, a.priceByArea,a.detailedType," +
                    "a.floor,a.district,a.neighborhood,a.hasLift,p.available," +
                    "p.price,a.suggestedTexts,ID(a), cosineSimilarity ORDER BY cosineSimilarity DESC LIMIT 10")
                    .then((result) => {
                        var arrayAlojamientos = [];
                        result.records.forEach(function (instancia) {
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
                                status: instancia._fields[15] === "good" ? "Buen estado" : instancia._fields[15] === "renew" ? "Necesita reforma" : "Nueva construcción",
                                priceByArea: instancia._fields[16],
                                detailedType: instancia._fields[17],
                                floor: instancia._fields[18] !== null ? parseInt(instancia._fields[18]) : "No disponible",
                                district: instancia._fields[19],
                                neighborhood: instancia._fields[20],
                                hasLift: instancia._fields[21] == true ? "Disponible" : "No disponible",
                                parkingSpaceAvailable: instancia._fields[22],
                                parkingSpacePrice: !instancia._fields[23] ? "No disponible" : instancia._fields[23].low > 0 ?  instancia._fields[23].low + " €" : "Gratuito",
                                suggestedTexts: instancia._fields[24],
                                id: parseInt(instancia._fields[25]),
                                likes: instancia._fields[26],

                            };
                            arrayAlojamientos.push(alojamiento);

                        })
                        return res.status(200).send({ alojamientos: arrayAlojamientos })



                    })
            } else {
                var arrayAlojamientos = [];
                result.records.forEach(function (instancia) {
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
                        status: instancia._fields[15] === "good" ? "Buen estado" : instancia._fields[15] === "renew" ? "Necesita reforma" : "Nueva construcción",
                        priceByArea: instancia._fields[16],
                        detailedType: instancia._fields[17],
                        floor: instancia._fields[18] !== null ? parseInt(instancia._fields[18]) : "No disponible",
                        district: instancia._fields[19],
                        neighborhood: instancia._fields[20],
                        hasLift: instancia._fields[21] == true ? "Disponible" : "No disponible",
                        parkingSpaceAvailable: instancia._fields[22],
                        parkingSpacePrice: !instancia._fields[23] ? "No disponible" : instancia._fields[23].low > 0 ?  instancia._fields[23].low + " €" : "Gratuito",
                        suggestedTexts: instancia._fields[24],
                        id: parseInt(instancia._fields[25]),
                        likes: instancia._fields[26],

                    };
                    arrayAlojamientos.push(alojamiento);

                })
                return res.status(200).send({ alojamientos: arrayAlojamientos })
            }
        })
        .catch((error) => {

        })

}
module.exports = { register, login, likeApartamento, dislikeApartment, isValued, isAuth, alojamientosRelatedUsers, setPreferences, getPreferences, alojamientosRecomendacionPersonalizada }