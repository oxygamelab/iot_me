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

//Vue.filter('toSafe', (val) => val.replace(/[^a-z0-9]/gi, '_').toLowerCase())

//import { lowercase, spinalcase } from 'stringcase'
Vue.filter('toSafe', function(value) {
  if (!value) return ''
  //return spinalcase(lowercase(value))
  return value
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .trim()
    .replace(/\s+/g, '-')
  //return spinalcase(lowercase(value.replace(/[^\w\s]/gi, '').trim()))
})

import autocomplete from './components/autocomplete'
Vue.component('autocomplete', autocomplete)

import { groups, topics } from './globals'

Vue.prototype.$panno = 0
//Vue.prototype.$topics = topics

Vue.mixin({
  data: function() {
    return {
      groups: groups,
      topics: topics,
    }
  },
  computed: {
    $pan: {
      get: function() {
        return globalData.$data.$pan
      },
      set: function(nw) {
        globalData.$data.$pan = nw
      },
    },
    $servers: {
      get: function() {
        return globalData.$data.$servers
      },
      set: function(nw) {
        globalData.$data.$servers = nw
      },
    },
  },
})

let globalData = new Vue({
  data: {
    $pan: 1,
    $servers: [
      {
        uniq: 'broker-hivemq-com-8000',
        host: 'broker.hivemq.com',
        port: '8000',
        path: '/mqtt',
        user: '',
        pass: '',
        editable: 0,
        selected: 1,
      },
      {
        uniq: 'test-mosquitto-com-8080',
        host: 'test.mosquitto.com',
        port: '8080',
        path: '/mqtt',
        user: '',
        pass: '',
        editable: 0,
        selected: 0,
      },
    ],
  },
})

new Vue({
  render: (h) => h(App),
}).$mount('#app')
