import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io';
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:1992',
  options: { path: "/my-app/" } //Optional options bu ne ne bilim
}))

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
