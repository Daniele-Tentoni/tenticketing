// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        baseURL: '/tenticketing/'
    },
    components: true,
    css: ["bulma", "@fortawesome/fontawesome-free/css/all.min.css",],
    runtimeConfig: {
        public: {
            apiKey: process.env.NUXT_PUBLIC_APPID || "",
            jsKey: process.env.NUXT_PUBLIC_JSKEY || ""
        }
    },
    typescript: { strict: true }
});
