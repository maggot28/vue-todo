import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Axios from 'axios'

import VueI18n from 'vue-i18n'
import VueMaterial from 'vue-material'
import Toasted from 'vue-toasted';
import VueDragscroll from 'vue-dragscroll'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false

Vue.use(VueDragscroll)
Vue.use(VueMaterial)
Vue.use(VueI18n)
Vue.use(Toasted, {
  position: "bottom-right",
  duration: 3000,
  keepOnHover: true,
})

Vue.prototype.$http = Axios;
const token = localStorage.getItem('VD_token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer " + token;
}

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
