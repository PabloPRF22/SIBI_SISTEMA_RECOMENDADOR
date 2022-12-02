const cors = require("cors");
const express = require("express");

const app = express();



  app.use(express.json());
  app.use(express.urlencoded());


  app.use("/api/usuario/", require("./Routes/User"));
  app.use("/api/alojamiento/", require("./Routes/Alojamiento"));

  app.listen(3001, () => {
    console.log(`Example app listening on port ` );

    //app.use(express.json());

});