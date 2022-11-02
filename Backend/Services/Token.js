const jwt = require("jwt-simple")
const moment = require("moment")
const config = require("../Config/config.json")
const bcrypt = require("bcrypt");

async function compare(password,hash){
    
    return await bcrypt.compare(password,hash)
}
function createToken(email){
    const payload = {
        sub: email,
        cdt: moment().unix(),
        fdt: moment().add(5000, "second").unix()
    }
    console.log(payload)
    
    return jwt.encode(payload,config["Secret-token"])
}
function decodeToken (token) {

    const decoded = new Promise((resolve, reject) => {
      try {

        const payload = jwt.decode(token, config["Secret-token"])
    
        if (payload.fdt <= moment().unix()) {

          reject({
            status: 401,
            message: 'El token ha expirado'
          })
        }


        resolve(payload.sub)
      } catch (err) {
        reject({
          status: 500,
          message: 'Invalid Token'
        })
      }
    })
  
    return decoded
  }
module.exports = {createToken,decodeToken,compare}