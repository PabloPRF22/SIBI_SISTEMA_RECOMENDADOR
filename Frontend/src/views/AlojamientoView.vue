<!-- eslint-disable no-unused-vars -->
<template>
  <div :style="{ backgroundColor : '#e2e2e2' }">
    <NavBar></NavBar>
    <v-card
      class="mx-auto"
      max-width="1000"
      color="#dcdcdc"
      :style="{ marginTop: '20px' }"
    >
      <v-card-title>
        {{ alojamiento.suggestedTexts }}
      </v-card-title>
      <v-card-text>
        <v-row class="value">
          <v-col>
            <v-img
              height="400"
              src="https://img3.idealista.com/blur/WEB_LISTING/0/id.pro.es.image.master/56/73/61/1013600904.jpg"
            >
            </v-img>
          </v-col>
        </v-row>
        <v-row class="row">
          <v-col class="titulo">Descripcion</v-col>
        </v-row>
        <v-row class="row">
          <v-col class="value">
            {{ alojamiento.description }}
          </v-col>
        </v-row>
        <v-row class="row">
          <v-col class="titulo" cols="2"> Estado </v-col>
          <v-col class="value">
            {{ alojamiento.status }}
          </v-col>
        </v-row>
        <v-row class="row">
          <v-col class="titulo" cols="2">
            Habitaciones <v-icon>mdi-bed</v-icon>
          </v-col>
          <v-col class="value">
            {{ alojamiento.rooms }}
          </v-col>
        </v-row>
        <v-row class="row">
          <v-col class="titulo" cols="2">
            Baños <v-icon>mdi-toilet</v-icon>
          </v-col>
          <v-col class="value">
            {{ alojamiento.bathrooms }}
          </v-col>
        </v-row>
        <v-row class="row">
          <v-col class="titulo" cols="2">
            Precio <v-icon>mdi-currency-eur</v-icon>
          </v-col>
          <v-col class="value">
            {{ alojamiento.price }}
          </v-col>
        </v-row>
        <v-row class="row">
          <v-col class="titulo" cols="2"> Tamaño </v-col>
          <v-col class="value"> {{ alojamiento.size }} m2 </v-col>
        </v-row>
        <v-row class="row">
          <v-col class="titulo" cols="2"> Provincia </v-col>
          <v-col class="value">
            {{ alojamiento.province }}
          </v-col>
          <v-col class="titulo" cols="2"> Distrito </v-col>
          <v-col class="value">
            {{ alojamiento.district }}
          </v-col>
        </v-row>
        <v-row class="row">
          <v-col class="titulo" cols="2"> Barrio </v-col>
          <v-col class="value">
            {{ alojamiento.neighborhood }}
          </v-col>
          <v-col class="titulo" cols="2"> Dirección </v-col>
          <v-col class="value">
            {{ alojamiento.address }}
          </v-col>
        </v-row>
        <v-row class="row">
          <v-col class="titulo" cols="2">
            Plaza de garaje <v-icon>mdi-parking</v-icon>
          </v-col>
          <v-col class="value">
            {{ alojamiento.parkingSpacePrice }}
          </v-col>
        </v-row>
        <v-row class="row">
          <v-col class="titulo" cols="2">
            Ascensor <v-icon>mdi-elevator-passenger</v-icon>
          </v-col>
          <v-col class="value">
            {{ alojamiento.hasLift }}
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions v-show="showAction">
        <v-container :style="{ display: 'flex' }">
          <v-btn :disabled="buttons.button1" @click = "likeApartamento"  color = "#42ffa3" :style="{ margin: '0 auto' }"
            >Me gusta <v-icon>mdi-thumb-up</v-icon></v-btn
          >
          <v-btn :disabled="buttons.button2" @click = "dislikeApartamento" color = "#ff5f46" :style="{ margin: '0 auto' }"
            >No me gusta <v-icon>mdi-thumb-down</v-icon></v-btn
          >
        </v-container>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import NavBar from "../components/Navbar.vue";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "AlojamientoView",

  components: {
    NavBar,
  },
  data() {
    return {
      alojamiento: {},
      showAction: false,
      valueStatus: null,
      buttons: {
        button1: false,
        button2: false,
      },
      headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
    };
  },
  computed: {
    ...mapGetters(["alojamientos"]),
    ...mapGetters(["currentUser"]),
  },

  watch: {
    currentUser: {
      handler: function (newVal) {
        if (newVal) {
          
          this.isValued()


        }
      },
    },
    alojamientos: {
      handler: function (newVal) {
        if (newVal) {
          this.alojamiento = this.alojamientos.filter((alojamiento) => {
            return alojamiento.propertyCode == this.$route.params.id;
          });
          this.alojamiento = this.alojamiento[0];
        }
      },
      immediate: true,
    },
  },
  methods: {
    isValued(){
      this.showAction = true;
          axios
            .get("/bac/api/usuario/isvalued", {
              params: { propertyCode: this.$route.params.id },
              headers: this.headers
            })
            .then((response) => {
              switch (response.data.status) {
                case "LIKE":
                  this.valueStatus = 'LIKE'
                  this.buttons.button1 = true;
                  break;
                case "DISLIKE":
                  this.valueStatus = 'DISLIKE'

                  this.buttons.button2 = true;
                  break;
                default:
                  this.valueStatus = null
                  this.buttons.button1 = false;
                  this.buttons.button1 = false;


              }
            });
    },
    dislikeApartamento() {
      axios
        .post(
          "/bac/api/usuario/dislikeApartamento",
          {
            propertyCode: this.$route.params.id,
            status: this.valueStatus,
          },
          { headers: this.headers }
        )

        .then(() => {
          this.valueStatus = 'DISLIKE'
          this.buttons.button1 = false,
          this.buttons.button2 = true

        })
        .catch(() => {});
    },
    likeApartamento() {
      axios
        .post(
          "/bac/api/usuario/likeApartamento",
          {
            propertyCode: this.$route.params.id,
            status: this.valueStatus,
          },
          { headers: this.headers }
        )

        .then(() => {
          this.valueStatus = 'LIKE'
          this.buttons.button1 = true,
          this.buttons.button2 = false

        })
        .catch(() => {

        });
    },
  },
  mounted(){
    if(this.currentUser){
      this.isValued()


    }
  }
};
</script>
<style scoped>
.titulo {
  font-weight: bold;
  margin-right: 0;
  text-decoration: underline;
  margin-right: 0px;
}
.row {
  margin-left: 0;
  margin-right: 0;
  background-color: #f6add0;
}
.value {
  background-color: #dcdcdc;
}
</style>
