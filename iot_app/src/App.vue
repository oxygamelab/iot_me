<template>
  <div class="h-100">
    <MyDash v-show="!this.$pan" />
    <MySett v-show="this.$pan" />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
//import HiBoss from "./components/HiBoss.vue";
import MyDash from './components/MyDash.vue'
import MySett from './components/MySett.vue'

export default {
  name: 'App',
  components: {
    MyDash,
    MySett,
  },
  created: function() {
    const el = document.body
    if (this.$dark) {
      el.classList.add('vdark')
    } else {
      el.classList.remove('vdark')
    }
  },
}
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.kmode {
  height: calc(100% - 56px);
  overflow: hidden;
}
.scrolly {
  overflow: hidden;
  overflow-y: scroll;
  padding: 15px 0;
  height: 100%;
  box-sizing: border-box;
}
.nav-link {
  color: #6c757d;
}
.nav-link.active {
  background-color: #563d7c !important;
}
.card-body > .card:first-child {
  margin-top: 0 !important;
}
.vdark .bg-light {
  background-color: #f1f2f3 !important;
}

body.vdark {
  background-color: #212529 !important;
  color: #ccc !important;
}
.vdark .card {
  background-color: #1b1e21 !important;
}
.vdark .card-body {
  background-color: #16181a !important;
}
.vdark .form-control {
  background-color: #eee !important;
  border: 1px solid #ddd !important;
}
.vdark .bg-light {
  background-color: #563d7c !important;
}
.vdark .navbar-brand {
  color: #ccc !important;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #563d7c;
}

input:focus + .slider {
  box-shadow: 0 0 1px #563d7c;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
