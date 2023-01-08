<template>
  <div>
    <v-container fluid v-show="show && alojamientos.length >=0" :style="{minHeight: alojamientos.length === 0 ? 'calc(100vh - 59px)': 'calc(100vh - 165px)'}">
      <v-card>
        <v-card-title :style="{ backgroundColor: '#f1c9ff' }">
          {{ titulo }}
        </v-card-title>
        <v-card-text :style="{ backgroundColor: '#dcdcdc' }">
          <v-data-table :loading="loading" :headers="headers" :items="items" :items-per-page="10" :item-class="row_classes" :no-data-text="'No hay datos disponibles'">
            <template v-slot:[`item.action`]="{ item }">
              <v-btn color="#59ff00" @click="consultar(item)">Consultar</v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
    <v-container fluid v-show="showCards" :style="{display: alojamientos.length === 0 ? 'none': 'none', minHeight: alojamientos.length === 0 ? 'calc(100vh - 59px)': 'calc(100vh - 165px)'}">
      <v-row :style="{ display: 'flex' }">
        <p class="text-h3" :style="{ marginRight: 'auto', marginLeft: 'auto', marginTop: '20px', fontWeight: 'bold' }">
          {{ titulo }}</p>
      </v-row>
      <v-row justify="center">
        <v-col v-for="(item, index) in items" cols="4" :key="'A' + index" class="d-flex justify-center align-center">
          <AlojamientoCard :alojamiento="item"></AlojamientoCard>

        </v-col>
      </v-row>
    </v-container>
    <v-container fluid v-show="show" :style="{ display: alojamientos.length === 0 ? 'block': 'none', minHeight: 'calc(100vh - 59px)'}">
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
    loading: true,
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

      if (newVal) {
        this.loading = false
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
    row_classes(item) {
      switch (item.color) {
        case 0:
          return "rowColor1"
        case 1:
          return "rowColor2"
        case 2:
          return "rowColor3"
        case 3:
          return "rowColor4"
        case 4:
          return "rowColor5"
        case 5:
          return "rowColor6"
        case 6:
          return "rowColor7"
        case 7:
          return "rowColor8"
        case 8:
          return "rowColor9"
        case 9:
          return "rowColor10"
        default:
          return "rowColor0"
      }
    }
  },
};
</script>

<style>
.v-btn--active .v-btn__content {

  color: red;
}

.rowColor0 {
  background-color: white
}

.rowColor1 {
  background-color: #87CEEB
}

.rowColor2 {
  background-color: #ADD8E6
}

.rowColor3 {
  background-color: #90f900
}

.rowColor4 {
  background-color: #c205db
}

.rowColor5 {
  background-color: #2793e6
}

.rowColor6 {
  background-color: #27eaac
}

.rowColor7 {
  background-color: #B0E0E6
}

.rowColor8 {
  background-color: #d1392d
}

.rowColor9 {
  background-color: #d7a6d5
}

.rowColor10 {
  background-color: #2323e9
}
</style>

