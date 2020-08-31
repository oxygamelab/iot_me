import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import VueMqtt from "vue-mqtt";
Vue.use(VueMqtt, "ws://broker.hivemq.com:8000", {
  clientId: "service-" + parseInt(Math.random() * 100000),
  connectTimeout: 5000,
  hostname: "broker.hivemq.com",
  port: 8000,
  path: "/mqtt",
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
