<template>
  <div class="h-100">
    <navbar />
    <div class="container-fluid container-lg kmode">
      <div class="row h-100">
        <listeners />
        <addtags />
        <edittags />
      </div>
    </div>
  </div>
</template>

<script>
import navbar from './navbar'
import listeners from './listeners'
import addtags from './addtags'
import edittags from './edittags'

export default {
  components: {
    navbar,
    listeners,
    addtags,
    edittags,
  },
}
</script>
