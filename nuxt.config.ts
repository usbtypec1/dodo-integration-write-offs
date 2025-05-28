// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primeuix/themes/aura";
import { definePreset } from "@primeuix/themes";
import tailwindcss from "@tailwindcss/vite";

const primevuePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{orange.50}",
      100: "{orange.100}",
      200: "{orange.200}",
      300: "{orange.300}",
      400: "{orange.400}",
      500: "{orange.500}",
      600: "{orange.600}",
      700: "{orange.700}",
      800: "{orange.800}",
      900: "{orange.900}",
      950: "{orange.950}",
    },
  },
});

const locale = {
  dayNames: [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ],
  dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  monthNames: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  monthNamesShort: [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ],
  today: "Сегодня",
  clear: "Очистить",
  weekHeader: "Нед",
  firstDayOfWeek: 1,
  dateFormat: "dd.mm.yy",
  fileSizeTypes: ["Б", "КБ", "МБ", "ГБ", "ТБ"],
};

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
        preset: primevuePreset,
      },
      locale,
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
  runtimeConfig: {
    apiBaseUrl: process.env.NUXT_API_BASE_URL
  },
  css: ["~/assets/css/main.css", "primeicons/primeicons.css"],
  ssr: false,
});
