<template>
  <div :style="{ backgroundColor: '#e2e2e2', minHeight: 'calc(100vh - 59px)' ,height:'100%', display: 'flex', flexDirection: 'column' }">
    <NavBar></NavBar>
    <div v-show="personalized && !loading" :style="{ height: '50px' }">
      <v-toolbar v-show="personalized" elevation=0>
        <v-switch v-model="tableSwitch" v-show="personalized && !loading" :style="{ position: 'absolute', right: 0 }"
          :label="`Tipo de visualización`"></v-switch>
      </v-toolbar>
    </div>
    <v-container v-show="!personalized && !loading"
      :style="{ height: '500px', width: '100%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', 'justify-content': 'center', textAlign: 'center', marginTop: 'auto', marginBottom: 'auto', borderRadius: '20px' }">
      <v-icon size="100">mdi-help</v-icon>
      <h1 :style="{ marginTop: '20px' }">Porfavor entra en tu perfil y establece tus preferencias</h1>
    </v-container>
    
    <AlojamientosTable v-show="personalized && !loading" :alojamientos="alojamientosTable" :show="tableSwitch" :style = "{minHeight: 'calc(100vh - 59px)'}"
      :titulo="'Recomendacion en base a sus preferencias'"></AlojamientosTable>
    <v-container v-show = "loading" :style="{ backgroundColor: 'rgb(226, 226, 226)', minHeight: 'calc(100vh - 59px)', width: '100%',display: 'flex' }">
      <v-progress-circular :size="80" indeterminate color="primary" :style = "{margin: 'auto auto'}"></v-progress-circular>

    </v-container>

  </div>
</template>

<script>
import NavBar from "../components/Navbar.vue";
import AlojamientosTable from "@/components/AlojamientosTable.vue";
import axios from 'axios'
import { mapGetters, mapActions } from "vuex";


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
      alojamientoSinFiltrar: [],
      tableSwitch: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
  },
  watch: {
    preferences(newVal) {

      if (newVal) {
        this.personalized = true
        this.recomendacion()

      }
    }
  },
  methods: {
    ...mapActions(["setLoadingAction"]),
    filter(filteredAlojamientos) {
      this.alojamientosSinFiltrar = this.alojamientosTable
      this.alojamientosTable = filteredAlojamientos;
    },
    resetFilter() {
      this.alojamientosTable = this.alojamientosSinFiltrar;
    },
    async recomendacion() {
      console.log(this.preferences)
      await axios.post("/bac/api/usuario/recomendacionPersonalizada", { currentUser: this.currentUser,preferences :this.preferences }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((result) => {
          console.log(result.data.alojamientos)
          result.data.alojamientos.map((alojamiento) => {
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

              });

          })
        })
      this.setLoadingAction(false)

    }
  },
  computed: {
    ...mapGetters(["currentUser", 'preferences', 'loading']),
  },
  mounted() {
    this.setLoadingAction(true)

    if (this.preferences) {

      this.personalized = true
      this.recomendacion()
    }
  }
};
</script>
