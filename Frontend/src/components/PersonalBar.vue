<template>
  <v-navigation-drawer
    r
    v-model="drawerOpen"
    @click.stop="drawerOpen = !drawerOpen"
    absolute
    stateless
    left
    :width="300"
    style="z-index: 10"
  >
    <v-list v-show="logged">
      <v-list-item class="px-2">
        <v-row>
          <v-col cols = "9">
            <v-list-item-avatar>
              <v-img
                src="https://randomuser.me/api/portraits/women/85.jpg"
              ></v-img>
            </v-list-item-avatar>
          </v-col>
          <v-col>
            <v-btn fab small @click="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">{{
            this.nombreCompleto
          }}</v-list-item-title>
          <v-list-item-subtitle>{{ this.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card lat class="ma-4" v-show="!logged" to="/login">
      <h3 class="font-weight-light grey lighten-2 pa-2">
        Inicia sesión para acceder a tu perfil
      </h3>
    </v-card>
    <v-divider></v-divider>

    <v-list>
      <v-list-item to="/">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/populares">
        <v-list-item-icon>
          <v-icon>mdi-star-face</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Populares</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/alojamientosBaratos">
        <v-list-item-icon>
          <v-icon>mdi-currency-eur</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Alojamientos Baratos</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-show="logged" link router to="/perfil">
        <v-list-item-icon>
          <v-icon>mdi-face-man-profile</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Mi perfil</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-show="logged" router to="/recomendacion">
        <v-list-item-icon>
          <v-icon>mdi-cards-heart</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            :style="{ overflow: 'unset', 'white-space': 'normal' }"
            >Recomendacion en base a otros usuarios similares</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-show="logged" router to="/recomendacionPersonalizada">
        <v-list-item-icon>
          <v-icon>mdi-account-star</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            :style="{ overflow: 'unset', 'white-space': 'normal' }"
            >Recomendacion personalizada</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      
      <v-list-item v-show="logged" link @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Salir</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <!-- <v-navigation-drawer r v-model="drawerOpen" @click.stop="drawerOpen = !drawerOpen" absolute stateless left :width="250" style="z-index: 10">
   <v-toolbar color="primaryLight" dark dense :height = "60">
     <v-toolbar-title>Informacion del nodo</v-toolbar-title>
     <v-btn>Hola</v-btn>
   </v-toolbar>
     <v-divider></v-divider>
     <v-img src = "https://www.lavanguardia.com/files/image_449_220/uploads/2019/05/17/5fa539e91e129.jpeg"   max-height="300" max-width="400"></v-img>
 </v-navigation-drawer> -->
</template>

<script>
import store from "@/store";
import { mapActions } from "vuex";
export default {
  name: "PersonalBar",
  props: {
    show: Boolean,
  },

  data() {
    return {
      drawerOpen: this.show,
      nombreCompleto: "",
      email: "",
    };
  },
  computed: {
    currentUser() {
      return store.getters.currentUser;
    },
    logged() {
      return store.getters.logged;
    },
  },
  watch: {
    show(newVal) {
      this.drawerOpen = newVal;
    },
    currentUser(newVal) {
      if (newVal) {
        this.instanciateData();
      }
    },
  },

  created() {},
  mounted() {
    if (this.currentUser) {
      this.instanciateData();
    }
  },
  methods: {
    ...mapActions(["setCurrentUserAction", "changeStateLogged"]),

    goLogin() {
      this.$router.push("/login");
    },
    goRegister() {
      this.$router.push("/register");
    },
    close() {
      console.log("ee");
      if (this.show) this.$emit("close");
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
      this.setCurrentUserAction(null);
      this.changeStateLogged();
    },
    goToRecomendacion() {
      this.$router.push("/recomendacion");
    },
    instanciateData() {
      this.nombreCompleto =
        this.currentUser.nombre + " " + this.currentUser.apellidos;
      this.email = this.currentUser.email;
    },
  },
};
</script>

<style scoped>
.setting-box-card {
  width: 300px;
  height: auto;
  position: absolute;
}
</style>
