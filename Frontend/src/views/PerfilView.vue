<template>
  <div :style="{ backgroundColor: '#e2e2e2' }">
    <NavBar></NavBar>
    <v-card>
      <v-card-title> Informacion para la recomendacion </v-card-title>
      <v-card-text>
        Elija sus preferencias
        <v-row>
          <v-col class="column">
            <v-select
              v-model="habitaciones"
              :items="[1, 2, 3, 4, 5, 6]"
              l
              label="Nº Habitaciones"
            ></v-select>
          </v-col>
          <v-col class="column">
            <v-select
              :items="[1, 2, 3]"
              v-model="banios"
              label="Nº Baños"
            ></v-select>
          </v-col>
          <v-col class="column">
            <v-select
              v-model="ascensor"
              :items="['Disponible', 'No disponible']"
              label="Disponibilidad de Ascensor"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="column">
            <v-select
              v-model="piso"
              :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]"
              label="Número de piso máximo"
            ></v-select>
          </v-col>
          <v-col class="column">
            <v-select
              v-model="garaje"
              :items="['Disponible', 'No disponible']"
              label="Disponibilidad de garaje"
            ></v-select>
          </v-col>
          <v-col class="column" name="Columna2">
            <v-select
              v-model="precioGaraje"
              :disabled="garaje != 'Disponible'"
              :items="['Gratuito', 'De pago']"
              label="Precio de la plaza de garaje"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="municipio"
              :items="itemDistrito"
              label="Municipio"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :style="{ display: 'flex', marginLeft: 'auto' }"
          :disabled="disabled"
          @click="establecerPreferencias"
        >
          Establecer estas preferencias
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import NavBar from "../components/Navbar.vue";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HomeView",

  components: {
    NavBar,
  },
  data() {
    return {
      habitaciones: null,
      banios: null,
      ascensor: null,
      piso: null,
      garaje: null,
      precioGaraje: null,
      userData: null,
      municipio: null,
      itemDistrito: [
      "Centro","Chorrillo","Valdepelayo - Montepinos - Arroyo Culebro","Valleaguado - La Cañada","Suroeste","Ciudad Lineal","No disponible","Puente de Vallecas","San José - Buenos Aires","Hospital","Parque de la Coruña - Las Suertes","Valderas - Los Castillos","Barajas","Getafe Centro","San Blas","Villaverde","Reyes Católicos","Val","Casco Urbano","Casco Histórico","Latina","Los Llanos - Valle Pardo","Ensanche","El Vallejo","Pintores-Ferial","Carabanchel","Zona Estación- Centro","Tetuán","El Quiñón","Constitución-El Balconcillo","Zona Pueblo","Señorío de Illescas","Valdemorillo pueblo","Arganzuela","Fuencarral","Vicálvaro","La Estación","Centro de Especialidades","Nuevo Aranjuez-Ciudad de las Artes","Moncloa","Reyes","Sudeste Industrial","Rivas Futura","Juan de la Cierva","Hortaleza","Las Lomas-Salinera-La Muñeca","Fuentebella-San Felix-El Leguario","Villa de Vallecas","Ciudad 70","El Mirador","El Mirador - Grillero","La Espinilla - Parque Blanco","Retiro","Montserrat - Parque Empresarial","Juan de Austria","Zona Estación","Noroeste","La Montaña-El Cortijo","Chamartín","La Alhóndiga","San Isidro - Los Almendros","Centro Urbano","Buenavista","Universidad","Pryconsa - Poligono Europa","Villalba Estación","Parque Inlasa","San Roque-Concordia-Adoratrices","Centro - Casco Histórico","Las Sedas - El Olivar","Las Cañas","Chamberí","Parque Europa - Los Pitufos","San Isidro","Las Matas- Peñascales","Casco Antiguo","Barrio de Salamanca","El Espinar","Seseña Nuevo","Bulevar - Plaza Castilla","Espartales","El Nido-Las Fuentes","Villayuventus-Renfe","Las Américas","Parque - Ctra de Ugena","Los Ángeles de San Rafael","Foso-Moreras","Parque Roma - Coronas","Getafe norte","Vega de la Moraleja","Pol. Industrial sur","Parla Este","La Dehesa - El Pinar","Usera","Carlos Ruiz","San Crispín - La Estación Consorcio","Zona Industrial","Alcobendas Centro","Dehesa - El Soto"
      ],
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
  },
  methods: {
    ...mapActions(["setPreferenciasAction"]),

    establecerPreferencias() {
      axios
        .post(
          "/bac/api/usuario/preferences",
          {
            habitaciones: this.habitaciones,
            banios: this.banios,
            ascensor: this.ascensor,
            piso: this.piso,
            garaje: this.garaje,
            precioGaraje: this.precioGaraje,
            municipio: this.municipio,
          },
          { headers: this.headers }
        )
        .then(() => {
          this.setPreferenciasAction({
            habitaciones: this.habitaciones,

            banios: this.banios,
            ascensor: this.ascensor,
            piso: this.piso,
            garaje: this.garaje,
            precioGaraje: this.precioGaraje,
            municipio: this.municipio,
          });
        });
    },
  },
  computed: {
    ...mapGetters(["currentUser", "loading", "preferencias"]),

    disabled() {
      return (
        this.habitaciones == null ||
        this.banios == null ||
        this.ascensor == null ||
        this.piso == null ||
        this.garaje == null ||
        (this.garaje == "Disponible" && this.precioGaraje == null) ||
        this.municipio == null
      );
    },
  },
  watch: {
    loading(val) {
      if (!val) {
        if (this.currentUser) {
          this.userData = this.currentUser;
        } else {
          this.$router.push("/login");
        }
      }
    },
    preferencias(preferencias) {
      if (preferencias) {
        this.habitaciones = preferencias.habitaciones;
        this.banios = preferencias.banios;
        this.ascensor = preferencias.ascensor;
        this.piso = preferencias.piso;
        this.garaje = preferencias.garaje;
        this.precioGaraje = preferencias.precioGaraje;
        this.municipio = preferencias.municipio;
      }
    },
  },
  mounted() {
    if (this.preferencias) {
      this.habitaciones = this.preferencias.habitaciones;
      this.banios = this.preferencias.banios;
      this.ascensor = this.preferencias.ascensor;
      this.piso = this.preferencias.piso;
      this.garaje = this.preferencias.garaje;
      this.precioGaraje = this.preferencias.precioGaraje;
      this.municipio = this.preferencias.municipio;
    }
  },
};
</script>
