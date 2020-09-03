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
</style>
