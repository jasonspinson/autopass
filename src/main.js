import Vue from 'vue'
import router from './router'
import store from './store'
import 'bootstrap'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueFire from  'vuefire'
import App from './App.vue'
 
Vue.use(VueGoogleMaps, {
  load: {
    ///import google api key(yours)
    key: 'AIzaSyAllUHHpw9-6xCQQbP-c_SQJnqCX9WRn8E',
  },
})

Vue.use(VueFire)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
