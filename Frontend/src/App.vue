<!-- eslint-disable no-unused-vars -->
<template>
  <v-app >
    <router-view />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",

  data: () => ({
    token: localStorage.getItem("token")
  }),
  computed: {
    ...mapGetters(["currentUser"]),
  },
  async created() {
    await this.initApplication();

  },
  methods: {
    ...mapActions(["initApp"]),
    async initApplication() {
      await this.initApp(this.token);
    },
  },
};
</script>
