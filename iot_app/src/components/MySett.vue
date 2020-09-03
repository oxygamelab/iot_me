<template>
  <div class="h-100">
    <navbar :title="'Settings'" />
    <div class="container-fluid container-lg kmode">
      <settings />
    </div>
  </div>
</template>

<script>
import navbar from './navbar'
import settings from './settings'

export default {
  components: {
    navbar,
    settings,
  },
}
</script>
