<template>
  <div  class="body-of-login"  >
    <v-container fill-height v-show = "!loading">
      <v-card class="mt-4 mx-auto  text-center hidden-sm-only" min-width="320">
        <v-card-text>
          <v-card
            class="v-card--offset mx-auto"
            color="#6bfc18"
            elevation="4"
            dark
          >
            <v-card-text>
              <v-icon size="96">mdi-home-city</v-icon>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-form color="6bfc18">
          <v-card-text>
            <v-text-field
              v-model="email"
              label="Nombre de usuario*"
              name="username"
              :rules="[usernameRules.required]"
              type="text"
            ></v-text-field>
            <v-text-field
              label="Contraseña*"
              name="password"
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[passwordRules.required]"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <div class="caption grey--text text--darken-1 text-left">
              *Campos requeridos
            </div>
          </v-card-text>
          <v-card-actions>
            <v-row align="center" no-gutters>
              <v-col class="text-center">
                <div class="my-2">
                  <v-btn color="#28fa6e" block v-on:click="login"
                    >Acceder</v-btn
                  >
                </div>
                <div>
                  <v-btn color="black" x-small text
                    >¿Olvidó su contraseña?</v-btn
                  >
                </div>
                <div>
                  <v-btn color="black" x-small text v-on:click="goToRegister"
                    >Registrarse</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-container>
    <v-container fill-height v-show = "loading">
      <v-card class="mt-4 mx-auto  text-center hidden-sm-only" min-width="320">
        <v-card-text>
          <v-card
            class="v-card--offset mx-auto"
            color="#6bfc18"
            elevation="4"
            dark
          >
            <v-card-text>
              <v-icon size="96">mdi-home-city</v-icon>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-form color="6bfc18">
          <v-card-text>
            <v-text-field
              v-model="email"
              label="Nombre de usuario*"
              name="username"
              :rules="[usernameRules.required]"
              type="text"
            ></v-text-field>
            <v-text-field
              label="Contraseña*"
              name="password"
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[passwordRules.required]"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <div class="caption grey--text text--darken-1 text-left">
              *Campos requeridos
            </div>
          </v-card-text>
          <v-card-actions>
            <v-row align="center" no-gutters>
              <v-col class="text-center">
                <div class="my-2">
                  <v-btn color="#28fa6e" block v-on:click="login"
                    >Acceder</v-btn
                  >
                </div>
                <div>
                  <v-btn color="black" x-small text
                    >¿Olvidó su contraseña?</v-btn
                  >
                </div>
                <div>
                  <v-btn color="black" x-small text v-on:click="goToRegister"
                    >Registrarse</v-btn
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
      :timeout="snackbar.timeout"
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
import { mapActions } from "vuex";

export default {
  name: "LoginView",

  components: {},
  data() {
    return {
      loading: false,
      email: "",
      password: "",
      showPassword: false,
      snackbar: {
        color: "",
        show: false,
        message: "",
        timeout: 0,
      },
      passwordRules: {
        required: (value) => !!value || "Requerida",
        minLenght: (value) =>
          value.length >= 8 || "Debe contener al menos 8 caracteres",
      },
      usernameRules: {
        required: (value) => !!value || "Requerido",
      },
    };
  },


  methods: {
    ...mapActions(["initApp"]),
    goToRegister() {
      this.$router.push("register");
    },

    login() {
      let self = this;
      let datos = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/bac/api/usuario/login", datos)
        .then((response)=> {

          self.snackbar.color = "#59ff00";
          self.snackbar.show = true;
          self.snackbar.message =
            "Bienvenido de nuevo " +
            response.data.user.nombre +
            " en 5 segundos sera redirigido";
          self.snackbar.timeout = 5000;
          window.localStorage.setItem("token", response.data.token);

          this.initApp();

          setTimeout(() => {
            self.$router.push("/");
          }, 5000);
        })
        .catch((error) =>{
          self.snackbar.color = "#f43232";
          self.snackbar.show = true;
          self.snackbar.message = error.response.data.message;
          self.snackbar.timeout = 3000;
        });
    },
  },
};
</script>
<style>
.body-of-login {
  width: 100vw;
  height: 100vh;
  background: url(../assets/backgroundLogin.jpg) no-repeat;
  background-size: cover;
}
</style>
