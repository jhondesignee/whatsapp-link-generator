export default defineNuxtConfig({
  css: [
    "vuetify/lib/styles/main.css",
    "@mdi/font/css/materialdesignicons.min.css"
  ],
  build: {
    transpile: ["vuetify"]
  },
  app: {
    head: {
      title: "WhatsApp Link Generator ¦ Jhon Designee"
    }
  },
  ignore: [
    ".git"
  ]
})
