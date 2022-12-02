<template>
  <div>
    <v-container fluid v-show="show">
      <v-card>
        <v-card-title :style = "{backgroundColor: '#f1c9ff'}">
          {{titulo}}
        </v-card-title>
        <v-card-text :style = "{backgroundColor: '#dcdcdc'}">
          <v-data-table loading = "true"
          :headers="headers"
          :items="items"
          :items-per-page="10"
          class="elevation-1"
        >
          <template v-slot:[`item.action`]="{ item }">
            <v-btn color="#59ff00" @click="consultar(item)">Consultar</v-btn>
          </template>
        </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
    <v-container fluid v-show="showCards">
      <v-row :style = "{display: 'flex'}">
        <p class = "text-h3" :style = "{marginRight: 'auto',marginLeft: 'auto', marginTop: '20px',fontWeight:'bold'}">{{titulo}}</p>
      </v-row>
      <v-row justify="center">
        <v-col v-for="(item,index) in items" cols = "4" :key="'A'+ index"   class="d-flex justify-center align-center"
>
          <AlojamientoCard :alojamiento = "item"></AlojamientoCard>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AlojamientoCard from "./AlojamientoCard.vue";
export default {
  name: "NavBar",
  props: {
    alojamientos: Array,
    show: Boolean,
    titulo: String
  },
  components: {
    AlojamientoCard,
  },

  data: () => ({
    items: [],
    showCards: false,
    headers: [
      {
        text: "Título",
        align: "start",
        sortable: false,
        value: "suggestedTexts",
      },
      { text: "Municipio", value: "municipality" },
      { text: "Distrito", value: "district" },
      { text: "Barrio", value: "neighborhood" },
      { text: "Precio €", value: "price" },
      { text: "m2", value: "size" },
      { text: "Estado", value: "status" },
      { text: "Plaza de Garaje", value: "parkingSpacePrice" },
      { text: "Planta", value: "floor" },

      { text: "Ascensor", value: "hasLift" },

      { text: "Habitaciones", value: "rooms" },
      { text: "Baños", value: "bathrooms" },
      { text: "", value: "action" },
    ],
  }),
  watch: {
    alojamientos(newVal) {
      console.log("cambie")
      if (newVal) {
        this.items = newVal;
      }
    },
    show(value) {
      this.showCards = !value;
    },
  },
  methods: {
    consultar(item) {
      this.$router.push({
        name: "Alojamiento",
        params: { id: item.propertyCode },
      });
    },
  },
};
</script>

<style scoped>
.v-btn--active .v-btn__content {
  color: red;
}
</style>
