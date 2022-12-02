<template>
<div :style = "{backgroundColor : '#e2e2e2' ,height: '100vh',  display:'flex',flexDirection:'column'}">
    <NavBar></NavBar>
    <div :style = "{height : '50px'} ">
      <v-toolbar v-show="personalized"   elevation = 0>
      <v-switch
        v-model="tableSwitch"
        :style = "{position: 'absolute', right: 0}"
        :label="`Tipo de visualización`"
      ></v-switch>
    </v-toolbar>
    </div>
    <v-container v-show = "!personalized && !loading" :style = "{height: '500px',width: '100%', backgroundColor:'white',display:'flex',flexDirection: 'column','justify-content': 'center',textAlign: 'center',marginTop: 'auto',marginBottom: 'auto',borderRadius: '20px'}"> 
      <v-icon size="100">mdi-help</v-icon>
      <h1 :style=" {marginTop:'20px'}">Porfavor entra en tu perfil y establece tus preferencias</h1>
    </v-container>
    <AlojamientosTable v-show = "personalized && !loading" :alojamientos="alojamientosTable" :show = "tableSwitch" :titulo = "'Recomendacion en base a sus preferencias'"></AlojamientosTable>


  </div>
</template>

<script>
import NavBar from "../components/Navbar.vue";
import AlojamientosTable from "@/components/AlojamientosTable.vue";
import axios from 'axios'
import { mapGetters } from "vuex";

export default {
  name: "RecomendacionView",

  components: {
    NavBar,
   AlojamientosTable,
  },
  data() {
    return {
      personalized: false,
      showPassword: false,
      alojamientosTable: [],
      alojamientoSinFiltrar : [],
      tableSwitch: true
    };
  },
  watch: {
    preferencias(newVal){

      if(newVal){
        this.personalized= true
        this.recomendacion()

      }
    }
  },
  methods: {
    filter(filteredAlojamientos) {
      this.alojamientosSinFiltrar = this.alojamientosTable
      this.alojamientosTable = filteredAlojamientos;
    },
    resetFilter() {
      this.alojamientosTable = this.alojamientosSinFiltrar;
    },
    recomendacion(){
      axios.post("/bac/api/usuario/alojamientosPreferencias", this.preferencias, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((result)=>{
        this.alojamientosTable = result.data.alojamientos
      })
    }
  },
  computed: {
    ...mapGetters(["currentUser",'preferencias','loading']),
  },
  mounted(){
    console.log(this.preferencias)
    if(this.preferencias){

      this.personalized = true
      this.recomendacion()
    }
  }
};
</script>
