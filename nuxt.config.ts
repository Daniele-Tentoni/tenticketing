// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    components: true,
    css: ["bulma", "@fortawesome/fontawesome-free/css/all.min.css",],
    runtimeConfig: {
        public: {
            apiKey: process.env.NUXT_PUBLIC_APPID || "",
            jsKey: process.env.NUXT_PUBLIC_JSKEY || ""
        }
    },
    router: {
        base: '/tenticketing/'
    },
    ssr: false,
    typescript: { strict: true }
});
