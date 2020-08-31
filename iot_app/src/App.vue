<template>
  <HiBoss />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import HiBoss from "./components/HiBoss.vue";

export default {
  name: "App",
  components: {
    HiBoss,
  },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
