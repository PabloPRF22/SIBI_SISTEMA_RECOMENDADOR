function verifyField(fields) {
  const validate = {
    okey: true,
    nombre: false,
    apellidos: false,
    email: false,
    rangoEdades: false,
    password1: false,
    password2: false,
    message: "",
  };
  console.log(fields["rangoEdades"] + "  ee")
  for (var field in fields) {
    console.log(field)
    switch (field) {
      case "nombre":
        if (fields[field].trim().length == 0) {
          validate.nombre = true;
          validate.okey = false;
        }
        break;
      case "apellidos":
        if (fields[field].trim().length == 0) {
          validate.apellidos = true;
          validate.okey = false;
        }
        break;
      case "email":
        if (fields[field].trim().length == 0) {
          validate.email = true;
          validate.okey = false;
        }
        break;
      case "rangoEdades":
        if (fields[field].trim().length == 0) {
          validate.rangoEdades = true;
          validate.okey = false;
        }
        break;
      case "password1":
        if (fields[field].trim().length == 0) {
          validate.password1 = true;
          validate.okey = false;
        }
        break;
      case "password2":
        if ( fields[field] != fields["password1"] ||fields[field].trim().length == 0) {
          validate.password2 = true;
          validate.okey = false;
        }
        break;
      default:
        validate.okey = false;
        return validate;
    }
    /*if(field != "nombre" && field != "apellidos" && field != "email" && field != "rangoEdad" && field != "password1" && field != "pasword2"){
            validate.okey = false
            return validate
        }*/
  }
  return validate;
}
function validateEmail(){

}

module.exports = { verifyField };
