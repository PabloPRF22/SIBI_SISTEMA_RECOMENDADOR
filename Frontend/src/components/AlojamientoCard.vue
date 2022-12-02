<template>
  <v-card
    color="#f1c9ff"
    :style="{ width: '500px', height: '500px', margin: '20px 20px' }"
    @click="consultar"
  >
    <v-card-text>
      <v-row>
        <v-img :src="alojamiento.thumbnail"></v-img>
      </v-row>
      <v-row>
        <p class="text-h6" :style="{ textDecoration: 'underline' }">
          {{ alojamiento.suggestedTexts }}
        </p>
      </v-row>
      <v-row>
        <v-col cols="1" :style="{ padding: 0 }">
          {{ alojamiento.bathrooms }}<v-icon>mdi-toilet</v-icon>
        </v-col>
        <v-col cols="1" :style="{ padding: 0 }">
          {{ alojamiento.rooms }}<v-icon>mdi-bed-king</v-icon>
        </v-col>
        <v-col cols="9" :style="{ padding: 0 }">
          {{ alojamiento.size }} m2
        </v-col>
        <v-col cols="1" :style="{ padding: 0 }">
          {{ alojamiento.price }}
        </v-col>
      </v-row>
      <v-row :style="{ padding: 0 }">
        {{ alojamiento.description.slice(0, 170) }}...
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    alojamiento: Object,
  },

  data: () => ({
    showPersonalBar: false,
  }),
  methods: {
    consultar() {
      this.$router.push({
        name: "Alojamiento",
        params: { id: this.alojamiento.propertyCode },
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
