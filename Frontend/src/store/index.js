/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged :false,
    currentUser: null,
    alojamientos: null,
    preferences: null,
    loading: true

  },
  getters: {
    loading: (state) => state.loading,
    logged: (state) => state.logged,
    currentUser: (state) => state.currentUser,
    alojamientos: (state) => state.alojamientos,
    preferences: (state) => state.preferences,


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
    setPreferences(state,data){
      state.preferences = data
    },
    setLoading(state,data){
      state.loading = data
    }
  },
  actions: {
    changeStateLoggedction(context) {
      context.commit("changeStateLogged");
    },
    setCurrentUserAction(context, data) {
      context.commit("setCurrentUser", data);
    },
    setPreferenciasAction(context,data){
      context.commit("setPreferences", data);

    },
    setLoadingAction(context,data){
      context.commit("setLoading", data);

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
      axios
      .get("/bac/api/usuario/preferences", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        commit("setPreferences", response.data.preferences);
      })
      commit("setLoading", false);

      
    },
  },
  modules: {
  }
})
