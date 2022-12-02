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
    <Filtros @filter="filter" @resetFilter="resetFilter" :datos = "alojamientos"></Filtros>
    <AlojamientosTable :alojamientos="alojamientosTable" :show = "tableSwitch" :titulo = "'Listado completo de alojamientos'"></AlojamientosTable>
  </div>
</template>

<script>
import NavBar from "../components/Navbar.vue";
import AlojamientosTable from "@/components/AlojamientosTable.vue";
import Filtros from "@/components/Filtros.vue";

export default {
  name: "HomeView",

  components: {
    NavBar,
    AlojamientosTable,
    Filtros,
  },
  data() {
    return {
      showPassword: false,
      alojamientosTable: [],
      tableSwitch: true
    };
  },
  methods: {
    filter(filteredAlojamientos) {
      this.alojamientosTable = filteredAlojamientos;
    },
    resetFilter() {
      this.alojamientosTable = this.alojamientos;
    },
  },
  computed: {
    alojamientos(){
      return this.$store.getters.alojamientos
    }
  },
  watch: {
    alojamientos(newVal) {
      if (newVal) {
        this.alojamientosTable = newVal;
      }
    },
  },
  mounted(){
    if(this.alojamientos){
      this.alojamientosTable = this.alojamientos

    }
  }
};
</script>
