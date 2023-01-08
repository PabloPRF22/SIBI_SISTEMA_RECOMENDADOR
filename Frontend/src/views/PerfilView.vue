<template>
  <div :style="{ backgroundColor: '#e2e2e2' }">
    <NavBar></NavBar>
    <v-card>
      <v-card-title> Informacion para la recomendacion </v-card-title>
      <v-card-text>
        Elija sus preferences
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
              v-model="garajeAvailable"
              :items="['Disponible', 'No disponible']"
              label="Disponibilidad de garaje"
            ></v-select>
          </v-col>
          <v-col class="column" name="Columna2">
            <v-select
              v-model="garajePrecio"
              :disabled="garajeAvailable != 'Disponible'"
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
          Establecer estas preferences
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
      garajeAvailable: null,
      garajePrecio: null,
      userData: null,
      municipio: null,
      itemDistrito: [
      "Madrid","Alcalá de Henares","Leganés","Coslada","Torrejón de Ardoz","Marchamalo","Alcorcón","Pinto","Pozo de Guadalajara","Valdemoro","Collado Villalba","Getafe","Paracuellos de Jarama","Villanueva del Pardillo","El Molar","Azuqueca de Henares","Parla","Tres Cantos","Seseña","Guadalajara","Campo Real","Pozuelo de Alarcón","Illescas","Valdemorillo","Alameda de la Sagra","Colmenarejo","Yuncos","Navalafuente","El Espinar","Villa del Prado","Ocaña","Aranjuez","Arganda","Fuensalida","Navalcarnero","Yuncler","Los Molinos","Fuenlabrada","Rivas-Vaciamadrid","Los Santos de la Humosa","Numancia de la Sagra","Sevilla la Nueva","Mocejón","Miraflores de la Sierra","Colmenar Viejo","Las Navas del Marqués","Pedrezuela","El Álamo","Yeles","San Fernando de Henares","Guadarrama","El Viso de San Juan","Loeches","Alovera","Robledo de Chavela","Casarrubios del Monte","Daganzo de Arriba","Villalbilla","Lominchar","San Sebastián de los Reyes","Mataelpino","Yebes","Santa Cruz del Retamar","Manzanares el Real","Calypo Fado","San Lorenzo de el Escorial","Aldea del Fresno","Chinchón","Algete","Bustarviejo","Las Rozas de Madrid","Galapagar","Villamanrique de Tajo","San Ildefonso o la Granja","Rascafría","Móstoles","Borox","Las Ventas de Retamosa","Recas","Valmojado","Serranillos del Valle","Villaseca de la Sagra","Cedillo del Condado","Esquivias","Camarena","El Escorial","El Casar","Torrelaguna","Cabañas de la Sagra","Camarma de Esteruelas","Meco","Alcobendas","Collado Mediano","Villaviciosa de Odón","Quijorna","Cobeña"

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
            garajeAvailable: this.garajeAvailable,
            garajePrecio: this.garajePrecio,
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
            garajeAvailable: this.garajeAvailable,
            garajePrecio: this.garajePrecio,
            municipio: this.municipio,
          });
        });
    },
  },
  computed: {
    ...mapGetters(["currentUser", "loading", "preferences"]),

    disabled() {
      return (
        this.habitaciones == null ||
        this.banios == null ||
        this.ascensor == null ||
        this.piso == null ||
        this.garajeAvailable == null ||
        (this.garajeAvailable == "Disponible" && this.garajePrecio == null) ||
        this.municipio == null
      );
    },
  },
  watch: {
    garajeAvailable(newVal){
      if(newVal && newVal == "No disponible"){
        this.garajePrecio = null
      }
    },
    loading(val) {
      if (!val) {
        if (this.currentUser) {
          this.userData = this.currentUser;
        } else {
          this.$router.push("/login");
        }
      }
    },
    preferences(preferences) {
      if (preferences) {
        console.log(preferences)
        this.habitaciones = preferences.habitaciones;
        this.banios = preferences.banios;
        this.ascensor = preferences.ascensor ? "Disponible" : "No disponible";
        this.piso = preferences.piso;
        this.garajeAvailable = preferences.garajeAvailable ? "Disponible" : "No disponible";
        this.garajePrecio = preferences.garajePrecio;
        this.municipio = preferences.municipio;
      }
    },
  },
  mounted() {
    if (this.preferences) {
      this.habitaciones = this.preferences.habitaciones;
      this.banios = this.preferences.banios;
      this.ascensor = this.preferences.ascensor;
      this.piso = this.preferences.piso;
      this.garajeAvailable = this.preferences.garajeAvailable;
      this.garajePrecio = this.preferences.garajePrecio;
      this.municipio = this.preferences.municipio;
    }
  },
};
</script>
