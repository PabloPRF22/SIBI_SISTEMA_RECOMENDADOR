<template>
  <div :style = "{backgroundColor : '#e2e2e2'}">
    <NavBar></NavBar>
    <v-toolbar :style = "{height : '50px'} "  elevation = 0>
      <v-switch
        v-model="tableSwitch"
        :style = "{position: 'absolute', right: 0}"
        :label="`Tipo de visualización`"
      ></v-switch>
    </v-toolbar>
    <Filtros @filter="filter" @resetFilter="resetFilter" :datos = "alojamientosTable"></Filtros>
    <AlojamientosTable :alojamientos="alojamientosTable" :show = "tableSwitch" :titulo = "'Recomendacion de alojamientos'"></AlojamientosTable>
  </div>
</template>

<script>
import NavBar from "../components/Navbar.vue";
import AlojamientosTable from "@/components/AlojamientosTable.vue";
import Filtros from "@/components/Filtros.vue";
import axios from 'axios'
import { mapGetters } from "vuex";

export default {
  name: "RecomendacionView",

  components: {
    NavBar,
    AlojamientosTable,
    Filtros,
  },
  data() {
    return {
      
      showPassword: false,
      alojamientosTable: [],
      alojamientoSinFiltrar : [],
      tableSwitch: true
    };
  },
  watch: {
    currentUser(newVal){
      if(newVal){
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
      axios.post("/bac/api/usuario/related", {currentUser: this.currentUser}, {
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
    ...mapGetters(["currentUser"]),
  },
  mounted(){
    if(this.currentUser){
      this.recomendacion()
    }
  }
};
</script>
