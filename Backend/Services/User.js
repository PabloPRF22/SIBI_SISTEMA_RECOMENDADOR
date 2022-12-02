function verifyField(fields) {
  const validate = {
    okey: true,
    nombre: false,
    apellidos: false,
    email: false,
    edad: false,
    password1: false,
    password2: false,
    ocupacion: false,
    estadoCivil: false,
    hijos: false,
    distrito: false,

    message: "",
  };
  for (var field in fields) {
    switch (field) {
      case "nombre":
        if (fields[field].trim().length == 0) {
          validate.nombre = true;
          validate.message =validate.message.concat("- El nombre es un campo requerido\n")

          validate.okey = false;
        }
        break;
      case "apellidos":
        if (fields[field].trim().length == 0) {
          validate.apellidos = true;
          validate.message =validate.message.concat("- Los apellidos un campo requerido\n")

          validate.okey = false;
        }
        break;
      case "email":
        if (fields[field].trim().length == 0) {
          validate.email = true;
          validate.message =validate.message.concat("- El email es un campo requerido\n")

          validate.okey = false;
        }
        break;
      case "edad":
        if (fields[field].trim().length == 0) {
          validate.message =validate.message.concat("- El edad es un campo requerido\n")

          validate.edad = true;
          validate.okey = false;
        }
        break;
      case "password1":
        if (fields[field].trim().length == 0) {
          validate.password1 = true;
          validate.message =validate.message.concat("- Es necesario una contraseña\n")

          validate.okey = false;
        }
        break;
      case "password2":
        if (fields[field] != fields["password1"] ||fields[field].trim().length == 0) {
          validate.message =validate.message.concat("- La segunda contraseña debe ser igual que la primera\n")

          validate.password2 = true;
          validate.okey = false;
        }
        break;
      case "ocupacion":
        if (fields[field].trim().length == 0) {
          validate.ocupacion = true;
          validate.message = validate.message.concat("- La ocupación es un campo requerido\n")
          validate.okey = false;
        }
        break;
      case "estadoCivil":
        if (fields[field].trim().length == 0) {
          validate.estadoCivil = true;
          validate.message = validate.message.concat("- El estado civil es un campo requerido\n")

          validate.okey = false;
        }
        break;
      case "distrito":
        if (fields[field].trim().length == 0) {
          validate.distrito = true;
          validate.message =validate.message.concat( "- El distrito es un campo requerido\n")

          validate.okey = false;
        }
        break;
      case "hijos":
        if (typeof(fields[field]) === Boolean) {
          validate.hijos = true;
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

module.exports = { verifyField };
