const neo4j = require("neo4j-driver");
const uri = "bolt://3.95.227.241:7687";

const user = "neo4j";

const password = "restriction-allegation-departure";


const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
/*module.exports = session; */

// npm install --save neo4j-driver

module.exports = driver; // La exportamos para que el controlador la pueda usar
