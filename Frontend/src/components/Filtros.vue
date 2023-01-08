<!-- eslint-disable no-unused-vars -->
<template>
  <v-expansion-panels  style="z-index: 5" >
    <v-expansion-panel elevation = 0>
      <v-expansion-panel-header>
        <div><v-icon>mdi-filter</v-icon> Filtros</div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-form ref="form">
          <v-row>
            <v-col class="column">
              <v-select
                :disabled="filtered"
                :items="[1, 2, 3, 4, 5, 6]"
                l
                label="Nº Habitaciones mínimo"
                v-on:change="filterHabitaciones"
              ></v-select>
            </v-col>
            <v-col class="column">
              <v-select
                :disabled="filtered"
                :items="[1, 2, 3]"
                l
                label="Nº Baños mínimo"
                v-on:change="filterBanios"
              ></v-select>
            </v-col>
            <v-col class="column">
              <v-select
                :disabled="filtered"
                :items="['Disponible']"
                label="Disponibilidad de Ascensor"
                v-on:change="filterAscensor"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="column">
              <v-select
                :disabled="filtered"
                :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]"
                label="Número de piso máximo"
                v-on:change="filterPiso"
              ></v-select>
            </v-col>
            <v-col class="column">
              <v-select
                :disabled="filtered"
                :items="['Disponible']"
                label="Disponibilidad de garaje"
                v-on:change="filterDisponibilidadGaraje"
              ></v-select>
            </v-col>
            <v-col class="column" name = "Columna2">
              <v-select
                :disabled="filtered"
                :items="['Gratuito', 'De pago']"
                label="Precio de la plaza de garaje"
                v-on:change="filterPrecioGaraje"
              ></v-select>
            </v-col>
          </v-row>
          <v-container fluid>
            <v-btn
              @click="reset"
              color="#fc0101"
              :style="{ marginRight: '30px' }"
              >Eliminar filtros</v-btn
            >

            <v-btn @click="submit" :disabled="filtered" color="#59ff00"
              >Filtrar</v-btn
            >
          </v-container>
        </v-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "FiltrosBar",

  data() {
    return {
      filteredAlojamientos: [],
      filtered: false,
    };
  },
  props: {
    datos: Array
  },
  watch: {
    datos(alojamientos) {
      if (alojamientos) {
        this.filteredAlojamientos = alojamientos;
      }
    },
    inmediate: true
  },
  methods: {
    filterHabitaciones(value) {
      let filtro = this.filteredAlojamientos.filter(function (alojamiento) {
        return alojamiento.rooms >= value;
      });
      this.filteredAlojamientos = filtro;
    },
    filterBanios(value) {
      let filtro = this.filteredAlojamientos.filter(function (alojamiento) {
        return alojamiento.bathrooms >= value;
      });
      this.filteredAlojamientos = filtro;
    },
    filterPiso(value) {
      let filtro = this.filteredAlojamientos.filter(function (alojamiento) {
        return parseInt(alojamiento.floor) <= value;
      });
      this.filteredAlojamientos = filtro;
    },
    filterAscensor(value) {
      let filtro = this.filteredAlojamientos.filter(function (alojamiento) {
        return alojamiento.hasLift === value;
      });
      this.filteredAlojamientos = filtro;
    },
    filterDisponibilidadGaraje() {
      let filtro = this.filteredAlojamientos.filter(function (alojamiento) {
        return alojamiento.parkingSpaceAvailable;
      });
      this.filteredAlojamientos = filtro;
    },
    filterPrecioGaraje(value) {
      let filtro;
      if (value == "Gratuito") {
        filtro = this.filteredAlojamientos.filter(function (alojamiento) {
          return alojamiento.parkingSpacePrice === "Gratuito";
        });
      } else {
        filtro = this.filteredAlojamientos.filter(function (alojamiento) {
          return (
            alojamiento.parkingSpacePrice !== "Gratuito" &&
            alojamiento.parkingSpacePrice !== "NO DISPONIBLE"
          );
        });
      }
      this.filteredAlojamientos = filtro;
    },
    submit() {
      console.log(this.filteredAlojamientos)
      this.filtered = true;
      this.$emit("filter", this.filteredAlojamientos);
    },
    reset() {
      this.filtered = false;
      this.$emit("resetFilter");

      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
.column {
  margin: 0 30px;
}
.v-btn--active .v-btn__content {
  color: red;
}
</style>
