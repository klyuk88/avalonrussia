// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Компания Avalon производит понтонные катера с 1972 года. Осуществляем поставки в Россию, а так же в другие страны мира. Ознакомьтесь с полной линейкой моделей понтонных катеров Avalon 2022.' },
        { name: 'keywords', content: 'avalon, понтонные катера, заказать понтонный катер, заказать катер avalon, avalonrussia' },

      ],
      link: [{
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.png'
      },
      ],
      script: [
        // { src: 'https://code.jivo.ru/widget/JGKIju88uK', async: true }
      ]
    }
  },
  css: [
    "@/assets/fonts/font.css",
    "@/assets/css/bootstrap-grid.min.css",
    "@/assets/css/style.css",
  ],
  runtimeConfig: {
    public: {
      apiURL: process.env.NODE_ENV === 'production' ? process.env.API_URL : process.env.API_URL_DEV
    }
  },
})
