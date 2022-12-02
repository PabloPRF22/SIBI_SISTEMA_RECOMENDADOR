const jwt = require("jwt-simple");
const tokenService = require("../services/token");


function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "Porfavor logueate"  });
  } else {
    const token = req.headers.authorization.split(" ")[1];

    tokenService.decodeToken(token)
      .then((response) => {
        res.locals.email = response;
        next()


      })
      .catch((error) => {
        return res.status(error.status).send("Por favor vuelve a logueate");
      });
  }
}
module.exports = { isAuth };