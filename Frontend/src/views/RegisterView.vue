<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<template>
  <div class="body-of-login">
    <v-container fill-height>
      <v-card class="mt-4 mx-auto text-center hidden-sm-only" min-width="320">
        <v-card-text>
          <v-card
            class="v-card--offset mx-auto"
            color="#6bfc18"
            elevation="2"
            dark
          >
            <v-card-text>
              <v-icon size="30">mdi-home-city</v-icon>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-form color="6bfc18">
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="datosUsuario.nombre"
                  :rules="[nombreRules.required, nombreRules.valid]"
                  label="Nombre"
                  name="nombre"
                  type="text"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="datosUsuario.apellidos"
                  :rules="[apellidosRules.required, apellidosRules.valid]"
                  label="Apellidos"
                  name="apellidos"
                  type="text"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="datosUsuario.email"
                  label="Email"
                  name="username"
                  :rules="[usernameRules.required, usernameRules.email]"
                  type="text"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="Contraseña*"
                  name="password1"
                  v-model="datosUsuario.password1"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[passwordRules.required, passwordRules.valid]"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Vuelve a introducir la contraseña*"
                  name="password2"
                  v-model="datosUsuario.password2"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[passwordRules2.required || passwordRules2.valid]"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  v-model="datosUsuario.distrito"
                  :items="itemDistrito"
                  :rules="[distritoRules.required || passwordRules.valid]"
                  label="Distrito"
                  solo
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  v-model="datosUsuario.edad"
                  :items="itemEdades"
                  :rules="[rangoEdadRules.required || passwordRules.valid]"
                  label="Rango de edad"
                  solo
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  v-model="datosUsuario.ocupacion"
                  :items="itemOcupacion"
                  :rules="[ocupacionRules.required || passwordRules.valid]"
                  label="Ocupacion"
                  solo
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  v-model="datosUsuario.estadoCivil"
                  :items="itemEstadoCivil"
                  :rules="[estadoCivilRules.required || passwordRules.valid]"
                  label="Estado civil"
                  solo
                ></v-select>
              </v-col>
            </v-row>
            <v-checkbox
              v-model="datosUsuario.hijos"
              :label="'Tiene Hijos/as'"
            ></v-checkbox>
            <v-checkbox
              :label="'Acepto los terminos y condiciones'"
            ></v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-row align="center" no-gutters>
              <v-col class="text-center">
                <div class="my-2">
                  <v-btn color="#28fa6e" block v-on:click="register"
                    >Registrarse</v-btn
                  >
                </div>
                <div>
                  <v-btn color="black" x-small text v-on:click="gotoLogin"
                    >Ya tiene cuenta</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-container>
    <v-snackbar
      v-model="snackbar.show"
      :timeout="10000"
      right
      :color="snackbar.color"
      class="snackbar"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "RegisterView",

  components: {},
  data() {
    return {
      datosUsuario: {
        nombre: "",
        apellidos: "",
        email: "",
        password1: "",
        password2: "",
        edad: "",
        ocupacion: "",
        estadoCivil: "",
        hijos: false,
        distrito: "",
      },
      itemEdades: [
        "Entre 18 y 25 años",
        "Entre 25 y 40 años",
        "Entre 41 y 55 años",
        "Entre 56 y  65 años",
        "Mayor a 66 años",
      ],
      itemOcupacion: ["Estudiante", "En paro", "Trabajador"],
      itemEstadoCivil: ["Soltero/a", "Divorciado/a", "Casado/a"],
      itemDistrito: [
        "Centro",
        "Arganzuela",
        "Retiro",
        "Salamanca",
        "Chamartín",
        "Tetuán",
        "Chamberí",
        "Fuencarral-El Pardo",
        "Moncloa-Aravaca",
        "Latina",
        "Carabanchel",
        "Usera",
        "Puente de Vallecas",
        "Moratalaz",
        "Ciudad Lineal",
        "Hortaleza",
        "Villaverde",
        "Villa de Vallecas",
        "Vicálvaro",
        "San Blas-Canillejas",
        "Barajas",
      ],
      showPassword: false,
      snackbar: {
        color: "",
        show: false,
        message: "",
      },
      validate: {
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
      },
      
      nombreRules: {
        required: (value) => !!value || "Requerido",
        valid: () => !this.validate.email || "Requerido",
  

   

      },
      apellidosRules: {
        required: (value) => !!value || "Requerido",
        valid: () => !this.validate.email || "Requerido",
      },
      usernameRules: {
        required: (value) => !!value || "Requerido",
        valid: () => !this.validate.email || "Requerido",
        email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'e-mail invalido.'
          },
      },
      passwordRules: {
        required: (value) => !!value || "Requerida",
        minLenght: (value) =>
          value.length >= 8 || "Debe contener al menos 8 caracteres",
        valid: () => !this.validate.password1 || "Requerido",
      },
      passwordRules2: {
        required: (value) => !!value || "Requerida",
        valid: () =>
          !this.validate.password1 || "Debe ser igual que la primera",
      },
      distritoRules: {
        required: (value) => !!value || "Requerido",
        valid: () => !this.validate.distrito || "Requerido",
      },
      rangoEdadRules: {
        required: (value) => !!value || "Requerido",
        valid: () => !this.validate.edad || "Requerido",
      },
      estadoCivilRules: {
        required: (value) => !!value || "Requerido",
        valid: () => !this.validate.estadoCivil || "Requerido",
      },
      ocupacionRules: {
        required: (value) => !!value || "Requerido",
        valid: () => !this.validate.ocupacion || "Requerido",
      },
    };
  },
  methods: {
    gotoLogin() {
      this.$router.push("login");
    },
    register() {
      let self = this;
      axios
        .post("/bac/api/usuario/register", this.datosUsuario)
        .then(function (response) {
          self.snackbar.color = "#59ff00";
          self.snackbar.show = true;
          self.snackbar.message = response.data.message;
          setTimeout(() => {
            self.$router.push("login");
          }, 5000);
        })
        // eslint-disable-next-line no-unused-vars
        .catch(function (error) {
          self.validate = error.response.data;
          self.snackbar.color = "#f43232";
          self.snackbar.show = true;
          self.snackbar.message = error.response.data.message;
        });
    },
  },
};
</script>
<style>
.snackbar {
  white-space: pre;
  text-align: "left";
}
.body-of-login {
  width: 100vw;
  height: 100vh;
  background: url(../assets/backgroundLogin.jpg) no-repeat;
  background-size: cover;
}
</style>
