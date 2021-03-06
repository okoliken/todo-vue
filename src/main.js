import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import './index.css'

import router from './router'

Vue.config.productionTip = false

export const bus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
