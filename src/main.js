import Vue from 'vue'
import App from './App.vue'
import Game from './components/Game'

Vue.config.productionTip = false

Vue.component('game', Game)

new Vue({
  render: h => h(App)
}).$mount('#app')
