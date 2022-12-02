/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged :false,
    currentUser: null,
    alojamientos: null

  },
  getters: {
    logged: (state) => state.logged,
    currentUser: (state) => state.currentUser,
    alojamientos: (state) => state.alojamientos,


  },
  mutations: {
    setAlojamientos(state,alojamientos) {
      state.alojamientos = alojamientos
      
    },
    changeStateLogged(state) {
      state.logueado = !state.logueado;
    },
    setCurrentUser(state, data) {
      state.logged =true
      state.currentUser = data;
    },
  },
  actions: {
    changeStateLoggedction(context) {
      context.commit("changeStateLogged");
    },
    setCurrentUserAction(context, data) {
      context.commit("setCurrentUser", data);
    },
    initApp: ({ commit }) => {
      axios
      .get("/bac/api/usuario/logged", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        commit("setCurrentUser", response.data.user);
      });
      axios
      .get("/bac/api/alojamiento/getall", {})
      .then((response) => {
        commit("setAlojamientos", response.data);

      })
      .catch(()=>{

      })
    },
  },
  modules: {
  }
})
