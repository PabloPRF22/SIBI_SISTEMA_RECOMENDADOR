import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import AlojamientoView from "../views/AlojamientoView";
import AlojamientosBaratosView from "../views/AlojamientosBaratosView"
import PopularesView from '../views/PopularesView'
import RecomendacionView from '../views/RecomendacionView'
import RecomendacionPersonalizadaView from '../views/RecomendacionPersonalizadaView'
import PerfilView from '../views/PerfilView'
import axios from "axios";
import store from '@/store'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/alojamiento/:id",
    name: "Alojamiento",
    component: AlojamientoView,
  },
  {
    path: "/populares",
    name: "Populares",
    component: PopularesView,
  },
  {
    path: "/recomendacion",
    name: "Recomendacion",
    component: RecomendacionView,
  },
  {
    path: "/recomendacionPersonalizada",
    name: "RecomendacionPersonalizada",
    component: RecomendacionPersonalizadaView,
  },
  {
    path: "/alojamientosBaratos",
    name: "AlojamientosBaratos",
    component: AlojamientosBaratosView,
  },
  {
    path: "/perfil",
    name: "Perfil",
    component: PerfilView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});
router.beforeEach((to, from, next) => {
  if (!store.getters.CurrentUser && to.name === "Login") {
    axios
      .get("/bac/api/usuario/logged", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        store.commit("setCurrentUser",response.data.user)
        router.push("/");
      })
      .catch(() => {

      });
  }
  next();

});

export default router;
