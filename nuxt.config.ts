// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Компания Avalon производит понтонные катера с 1972 года. Ознакомьтесь с полной линейкой моделей понтонных катеров Avalon 2022.' },
        { name: 'keywords', content: 'avalon, понтонные катера, заказать понтонный катер, заказать катер avalon' },

      ],
      link: [{
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.png'
      },
      ],
      script: [
        // { src: '/scripts/script.js' }
      ],
    }
  },
  css: [
    "@/assets/fonts/font.css",
    "@/assets/css/bootstrap-grid.min.css",
    "@/assets/css/style.css",
  ],
  runtimeConfig: {
    public: {
      apiURL: "https://api.avalonrussia.ru"
    }
  },
})
