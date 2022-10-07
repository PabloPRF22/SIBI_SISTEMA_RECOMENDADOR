const cors = require("cors");
const express = require("express");

const app = express();



  app.use(express.json());
  app.use(express.urlencoded());


  app.use("/api/usuario/", require("./Routes/User"));
  
  app.listen(3001, () => {
    console.log(`Example app listening on port ` );

    //app.use(express.json());
  app.use(cors())
});