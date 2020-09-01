import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueMqtt from 'vue-mqtt'
Vue.use(VueMqtt, 'ws://broker.hivemq.com:8000', {
  clientId: 'service-' + parseInt(Math.random() * 100000),
  connectTimeout: 5000,
  hostname: 'broker.hivemq.com',
  port: 8000,
  path: '/mqtt',
})

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)
Vue.component('fa-icons', FontAwesomeIcon)

Vue.filter('toSafe', (val) => val.replace(/[^a-z0-9]/gi, '_').toLowerCase())

import autocomplete from './components/autocomplete'
Vue.component('autocomplete', autocomplete)

import { groups, topics } from './globals'

//Vue.prototype.$groups = groups
//Vue.prototype.$topics = topics

Vue.mixin({
  data: function() {
    return {
      groups: groups,
      topics: topics,
    }
  },
})

new Vue({
  render: (h) => h(App),
}).$mount('#app')
