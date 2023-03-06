import { createVuetify, ThemeDefinition } from "vuetify"
import colors from "vuetify/lib/util/colors"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

export default defineNuxtPlugin((nuxtApp) => {
  const appTheme: ThemeDefinition = {
    dark: true,
    colors: {
      background: "#334",
      surface: "#445",
      primary: colors.purple.base,
      secondary: colors.indigo.darken1,
      accent: colors.lightBlue.accent3
    }
  }
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: "appTheme",
      themes: {
        appTheme
      }
    }
  })
  nuxtApp.vueApp.use(vuetify)
})