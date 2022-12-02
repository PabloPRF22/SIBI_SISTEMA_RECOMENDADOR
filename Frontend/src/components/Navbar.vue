<template>
  <div>
    <v-app-bar
      color="#ff638c"
      dense
      dark
      height = "59px"
    >
      <v-app-bar-nav-icon v-on:click="showPersonalBar = true"></v-app-bar-nav-icon>


      <v-spacer></v-spacer>

      <v-btn elevation = 0 color="#ff638c" class = "btn" router to="/">Principal</v-btn>

      <v-btn  elevation = 0 color="#ff638c" :style = "{textdecoration : 'blue'}" router to="/populares">Populares</v-btn>
      <v-btn  elevation = 0 color="#ff638c" :style = "{textdecoration : 'blue'}" router to="/alojamientosBaratos">Alojamientos Baratos</v-btn>
      <v-btn v-show = "logged" @click = "logout" color = "#fc2121">Salir</v-btn>
      <v-btn v-show = "!logged" router to ="/login" color = "#0af234">Login</v-btn>

    </v-app-bar>
    <PersonalBar :show = showPersonalBar @close = "close"></PersonalBar>

  </div>
  
</template>

<script>
import router from '@/router';
import PersonalBar from './PersonalBar.vue'

export default {
  name: "NavBar",
  components: {
    PersonalBar
  },
  computed: {
    logged(){
      return this.$store.getters.logged
    }
  },
  data: () => ({
    
    showPersonalBar: false

  }),


  methods:{

    principal(){
      router.push('/')
    },
    populares(){
      router.push('/populares')
    },
    close(){
      this.showPersonalBar =false
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
      this.setCurrentUserAction(null);
      this.changeStateLogged();
    },
  }
};
</script>

<style scoped>
.v-btn--active .v-btn__content { 
  color: red 
}  
</style>
