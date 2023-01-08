<template>
  <div :style="{ backgroundColor: '#e2e2e2' }">
    <NavBar></NavBar>
    <v-toolbar :style="{ height: '50px', display: alojamientosTable.length === 0 && this.alojamientoSinFiltrar.length !==0  ? 'none' : 'block' }" elevation=0>
      <v-switch v-model="tableSwitch" :style="{ position: 'absolute', right: 0 }"
        :label="`Tipo de visualización`"></v-switch>
    </v-toolbar>
    <Filtros @filter="filter" @resetFilter="resetFilter" :datos="alojamientosTable"
      :style="{ display: alojamientosTable.length === 0 && this.alojamientoSinFiltrar.length !==0 ? 'none' : 'block' }"></Filtros>
    <AlojamientosTable :alojamientos="alojamientosTable" :show="tableSwitch" :titulo="'Recomendacion de alojamientos'"
      :style="{ display: alojamientosTable.length === 0  && this.alojamientoSinFiltrar.length !==0  ? 'none' : 'block' }"></AlojamientosTable>
    <Container
      :style="{ display: alojamientosTable.length === 0 && this.alojamientoSinFiltrar.length !==0  ? 'flex' : 'none', minHeight: 'calc(100vh - 59px)', backgroundColor: '#f1c9ff', textAlign: 'center' }">
      <h1 :style="{ fontSize: '60px', margin: 'auto auto' }">Todavia no hay usuarios similares</h1>
    </Container>
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
      alojamientoSinFiltrar: [],
      tableSwitch: true,
      loading: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
  },
  watch: {
    currentUser(newVal) {
      if (newVal) {
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
    recomendacion() {
      axios.post("/bac/api/usuario/related", { currentUser: this.currentUser }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((result) => {
          result.data.alojamientos.map((alojamiento, index) => {
            axios
              .get("/bac/api/usuario/isvalued", {
                params: { propertyCode: alojamiento.propertyCode },
                headers: this.headers
              })
              .then((response) => {
                console.log(response.data.status)
                if (response.data.status !== "LIKE" && response.data.status !== "DISLIKE") {
                  this.alojamientosTable.push(alojamiento)
                }
                if (index === result.data.alojamientos.length){
                  this.loading = false

                }
              });

          })
          this.loading = false

        })
    }
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  mounted() {
    if (this.currentUser) {
      this.recomendacion()
    }
  }
};
</script>
