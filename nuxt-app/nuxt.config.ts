// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss'],
	routeRules: {
		'/': { ssr: false }
	},
	hooks: {
		listen: (server) => {
			console.log('hello');
		}
	}
});
