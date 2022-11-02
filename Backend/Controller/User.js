const userService = require("../services/User");
const token = require("../services/token");
const driver = require("../Conector/connector")



function register(req,res) {
    const session = driver.session();
    var newUser = req.body
    var validate = userService.verifyField(newUser)


    if(validate.okey == false){
        validate.message = "Introduce los datos correctamente"
        return res.status(400).send(validate)
    }

    return session.run('MATCH (user:User {email: $email}) RETURN user', {
            email: newUser.email
        })
        .then(results => {

            if (results.records.length !=0) {
                validate.message = "Ya existe un usuario con ese correo"
                return res.status(400).send(validate)
            }else{  
                return session.run('CREATE (user:User {email: $email,nombre: $nombre,apellidos: $apellidos,rangoEdades: $rangoEdades,password: $password}) RETURN user', {
                    email: req.body.email,
                    nombre: req.body.nombre,
                    apellidos: req.body.apellidos,
                    rangoEdades: req.body.rangoEdades,
                    password: req.body.password1,
                }).then(results => {

                    validate.message = "Bienvenido " + req.body.nombre + " en 5 segundos sera redirigido a el login"
                    return res.status(200).send(validate)
                }).catch(error=>{

                    return res.status(500).send({message:"Error interno del servidor"})
                }).finally(()=>{
                    session.close()
                })

            }
        });
};
function login(req,res){
    var userData = req.body
    const session = driver.session();
    return session.run('MATCH (user:User {email: $email, password: $password}) RETURN user', {
        email: userData.email,
        password: userData.password

    })
    .then(results=>{
        if (results.records.length !=0) {
            results.records.forEach(function(instancia){
              

                session.close()
                return res.status(200).send({message: "Bienvenido de nuevo " + instancia._fields[0].properties.nombre, token: token.createToken(userData.email,)})

            });


        }else{
            return res.status(400).send({message: "El email o la contraseña son incorrectos"})
            
        }
    
    }).catch(()=>{
        return res.status(500).send({message:"Internal error"})

    }).finally(()=>{
        session.close()
    })



}
function isValued(req,res){
    const session = driver.session();
    return session.run('MATCH (u:User {email: $email})-[r:LIKE|DISLIKE]->(a:Alojamiento {propertyCode:$propertyCode}) RETURN r', {
        email: res.locals.email,
        propertyCode: parseInt(req.query.propertyCode)

    }).then(results =>{

        if(results.records.length != 0){

            if( results.records[0]._fields[0].type == "LIKE"){
                return res.status(201).send({status: "LIKE"})
            } 
            return res.status(201).send({status: "DISLIKE"})

        }
        return res.status(201).send({status: "null"})
    })    
}
function likeApartamento(req,res){
    const session = driver.session();
    if(req.body.status =="success") return res.status(304).send({message:"No changes"})
    return session.run('MATCH (u:User {email: $email}),(a:Alojamiento {propertyCode: $propertyCode}) CREATE(u)-[r:LIKE]->(a)  RETURN r', {
        email: res.locals.email,
        propertyCode: req.body.propertyCode

    })
    .then(results=>{

        if (results.records.length !=0) {
        return session.run('MATCH (u:User {email: $email})-[r:DISLIKE]->(a:Alojamiento {propertyCode: $propertyCode}) DELETE r', {
            email: res.locals.email,
            propertyCode: req.body.propertyCode
    
        })
        .then(results=>{
              
            console.log(results.records)
            session.close()
            return res.status(200).send({message: "Le diste like" })
        })

        }
    
    }).catch((error)=>{
        console.log(error)
        return res.status(500).send({error})

    }).finally(()=>{
        session.close()
    })
}
function dislikeApartment(req,res){
    const session = driver.session()
    if(req.body.status =="error") return res.status(304).send({message:"No changes"});
    return session.run('MATCH (u:User {email: $email}),(a:Alojamiento {propertyCode: $propertyCode}) CREATE(u)-[r:DISLIKE]->(a)  RETURN r', {
        email: res.locals.email,
        propertyCode: req.body.propertyCode

    })
    .then(results=>{
        if (results.records.length !=0) {
        return session.run('MATCH (u:User {email: $email})-[r:LIKE]->(a:Alojamiento {propertyCode: $propertyCode}) DELETE r', {
            email: res.locals.email,
            propertyCode: req.body.propertyCode
    
        })
        .then(results=>{
              
            console.log(results.records)
            session.close()
            return res.status(200).send({message: "Le diste dislike like" })
        })

        }
    
    }).catch((error)=>{
        console.log(error)
        return res.status(500).send({error})

    }).finally(()=>{
        session.close()
    })
}
module.exports = {register,login,likeApartamento,dislikeApartment,isValued}