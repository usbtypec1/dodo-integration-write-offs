// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primeuix/themes/aura";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@primevue/nuxt-module"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
      locale: {
        dayNames: [
          "Воскресенье",
          "Понедельник",
          "Вторник",
          "Среда",
          "Четверг",
          "Пятница",
          "Суббота",
        ],
      },
    },
  },
  app: {
    head: {
      script: [
        {
          src: "https://telegram.org/js/telegram-web-app.js?57",
        },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/css/main.css", "primeicons/primeicons.css"],
  ssr: false,
});
