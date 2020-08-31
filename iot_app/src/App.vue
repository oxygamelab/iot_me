<template>
  <MyDash />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
//import HiBoss from "./components/HiBoss.vue";
import MyDash from "./components/MyDash.vue";

export default {
  name: "App",
  components: {
    MyDash,
  },
};
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
</style>
