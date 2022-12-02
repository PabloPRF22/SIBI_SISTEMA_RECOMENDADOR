const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/bac": {
        target: "http://127.0.0.1:3001",
        pathRewrite: { "^/bac": "" },
      },
    },
  },
});
