<template>
  <div :style = "{backgroundColor : '#e2e2e2'}">
    <NavBar></NavBar>
    <v-toolbar :style = "{backgroundColor : '#e2e2e2'}" elevation = 0>
      <v-switch
        v-model="tableSwitch"
        :style = "{position: 'absolute', right: 0}"
        :label="`Tipo de visualización`"
      ></v-switch>
    </v-toolbar>
    <AlojamientosTable
      :alojamientos="alojamientosTable"
      :show="tableSwitch"
      :titulo = "'Listado de alojamientos populares'"
    ></AlojamientosTable>
    <Filtros @filter="filter" @resetFilter="resetFilter" :datos = "alojamientosRelacionadosTable" ></Filtros>

    <AlojamientosTable
      :titulo = "'Listado de alojamientos relacionados'"

      :alojamientos="alojamientosRelacionadosTable"
      :show="tableSwitch"
    ></AlojamientosTable>
  </div>
</template>

<script>
import NavBar from "../components/Navbar.vue";
import AlojamientosTable from "@/components/AlojamientosTable.vue";
import Filtros from "@/components/Filtros.vue";
import axios from "axios";
export default {
  name: "PopularesView",

  components: {
    NavBar,
    AlojamientosTable,
    Filtros,
  },
  data() {
    return {
      showPassword: false,
      alojamientosTable: [],
      alojamientosRelacionadosTable: [],
      alojamientoSinFiltrar: [],
      tableSwitch: true,
    };
  },
  methods: {
    filter(filteredAlojamientos) {
      this.alojamientoSinFiltrar = this.alojamientosRelacionadosTable
      this.alojamientosRelacionadosTable = filteredAlojamientos;
    },
    resetFilter() {
      this.alojamientosRelacionadosTable = this.alojamientoSinFiltrar;
    },
  },
  watch: {},
  mounted() {
    let self = this;
    axios
      .get("/bac/api/alojamiento/getMasPopulares", {})
      .then((response) => {
        this.alojamientosTable = response.data;
        this.alojamientosTable.map((alojamiento) => {
          axios
            .post("/bac/api/alojamiento/getRelacionados", alojamiento)
            .then(function (response2) {
              response2.data.forEach((alojamiento) =>{
                self.alojamientosRelacionadosTable.push(alojamiento)
              })
            })
            .catch(() => {
            })
        });
      })
      .catch(() => {});
  },
};
</script>
