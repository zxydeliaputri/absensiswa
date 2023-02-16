export default defineNuxtConfig({
  
  css: ["bootstrap/dist/css/bootstrap.min.css"],
  modules: ["@nuxtjs/supabase"],
  
  router: {
    routes: [
      {
        name: 'admin',
        path: '/admin/:id',
        component: '~/pages/admin.vue'
      }
    ]
  },

})