const neo4j = require("neo4j-driver");
const uri = 'neo4j+s://localhost:7474';

const user = 'neo4j';

const password = 'cerverus1';



const driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic('neo4j', 'cerverus1'))
/*module.exports = session; */

// npm install --save neo4j-driver

module.exports = driver; // La exportamos para que el controlador la pueda usar
